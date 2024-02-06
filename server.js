
const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const encodedParser = parser.urlencoded({extended: true})
const uploadProcessor = multer({dest: "public/upload"})
const nedb = require('nedb')

const https = require('https');
const fs = require('fs'); // Using the filesystem module

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/nyurunclub.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/nyurunclub.org/fullchain.pem')
};

const app = express();
app.use(express.static('public'))
app.use(encodedParser)
app.set('view engine', 'ejs')

let data = [];
let alert = null;

let database = new nedb({
    filename: 'database.txt',
    autoload: true
})

app.get('/', (req, res) => {
    res.render("index.ejs", {messages : data})
})
app.get('/photos', (req, res) => {
    let query = {}

    let sortQuery = {
        timestamp: -1
    }

    database.find(query).sort(sortQuery).exec((error, photos) => {
        res.render("photos.ejs", {messages : photos, popup : alert})
        alert = null;
    })


})
app.get('/add-photos', (req, res) => {
    let query = {}

    database.find(query, (error, photos) => {
        res.render('add-photos.ejs', {messages: photos})
    })
})

app.post('/upload', (req, res) => {
    // console.log(req.body)

    let now = new Date( )

    let message = {
        name: req.body.name,
        text: req.body.text,
        date: now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    }
    if(!message.name) {
        message.name = "[Anonymous]";
    }
    if(message.text) {
        data.unshift(message);
    }

    res.redirect('/community#contact-info')
})

app.post('/upload-photo', uploadProcessor.single("theimage"), (req, res) => {
    // console.log(req.body)
    if(!req.file) {
        alert = "No File Added";
        res.redirect('/photos');
    }

    let currDate = new Date();

    let photo = {
        imgSrc: "../upload/" + req.file.filename,
        imgType: req.body.imagetype,
        timestamp: currDate.getTime()
    }
    // photos.unshift(photo);

    database.insert(photo, (error, newData) => {
        alert = "Image Successfully Added"
        res.redirect('/photos'); 
    })
    // res.redirect('/photos'); 

});

app.post('/remove', (req,res) => {
    let messageId = req.body.messageId
    // console.log(messageId);
    if(!messageId) {
        alert = "Cannot Remove Image";
    } else {
        alert = "Image Successfully Removed";
    }
    let query = {
        _id: messageId
    }

    database.remove(query, (error, numRemoved)=> {
        // console.log(numRemoved)
        res.redirect('/photos')
    })
});

app.listen(8000, 'localhost', () => {
    console.log('server has started on port 8000')
})

// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(443);
