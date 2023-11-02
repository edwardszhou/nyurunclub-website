window.onload = () => {

    let practicesContainer = document.getElementById("practices");

    for(let i = 40; i>=1; i--) {
        let image = document.createElement("img");
        image.className = "gallery-photos lazy";
        image.setAttribute("data-src","/photos/practices/" + i + ".jpg");
        practicesContainer.appendChild(image);
    }

    let racesContainer = document.getElementById("races");

    for(let i = 41; i>=1; i--) {
        let image = document.createElement("img");
        image.className = "gallery-photos lazy";
        image.setAttribute("data-src","/photos/races/" + i + ".jpg");
        racesContainer.appendChild(image);
    }

    let eventsContainer = document.getElementById("events");

    for(let i = 14; i>=1; i--) {
        let image = document.createElement("img");
        image.className = "gallery-photos lazy";
        image.setAttribute("data-src","/photos/events/" + i + ".jpg");
        eventsContainer.appendChild(image);
    }


    let modal = document.getElementById("modal-section");
    let imgs = document.getElementsByClassName("gallery-photos");
    let modalImg = document.getElementById("modal-img");
    let removeHidden = document.getElementById("remove-hidden");

    for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i];
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
            removeHidden.value = img.id;
        });
     
    }

    let close = document.getElementById("close-modal");
    close.addEventListener("click", () => {
        modalImg.classList.add("modal-closing");
        setTimeout(()=> {
            modal.style.display = "none";
            modalImg.classList.remove("modal-closing");
        }, 240)
    });
    modal.addEventListener("click", () => {
        modalImg.classList.add("modal-closing");
        setTimeout(()=> {
            modal.style.display = "none";
            modalImg.classList.remove("modal-closing");
        }, 240)
    });
    modalImg.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });

    let popup = document.getElementById("popup");
    if(popup) {
        alert(popup.getAttribute("data-value"));
    }
    
    let lazyImages;
    console.log("script loaded");
    if("IntersectionObserver" in window) {
        lazyImages = document.querySelectorAll("img.lazy");
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    imageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach((image) => {
            imageObserver.observe(image);
        });
    }


}