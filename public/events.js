window.onload = () => {
    console.log("script loaded");

    let calendarContainer = document.getElementById("calendar-container");
    let eventsLoaded = 0;
    let today = new Date();

    while(eventsLoaded < 15) {
        
        if(today < new Date('2024-09-10')) { // Start of season check
            today.setDate(today.getDate() + 1);
            continue;
        }

        let dayOfWeek = today.getDay();
        if(dayOfWeek <= 2|| dayOfWeek >= 5) {
            let event = document.createElement("div");
            let eventName = document.createElement("div");
            let eventDate = document.createElement("div");
            let eventMessage = document.createElement("p");
    
            event.className = "message-item";
            eventName.className = "message-name";
            eventDate.className = "message-date";
            eventMessage.className = "message";
    
            calendarContainer.appendChild(event);
            event.appendChild(eventName);
            event.appendChild(eventDate);
            event.appendChild(eventMessage);

            
            if(today > new Date('2024-12-18')) { // End of season check
                eventName.innerHTML = "END OF FALL 2024 SEASON";
                break;
            }
            
            eventDate.innerHTML = today.toLocaleDateString('en-US', { timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long'});

            let date = today.getDate(), month = today.getMonth();

            if(date == 19 && month == 9) { // Falling Leaves
                eventName.innerHTML = "RACE: NYCRUNS Falling Leaves 5K";
                eventMessage.innerHTML = "Prospect Park";
                eventDate.innerHTML += ", 7:00 AM";
            } else if(date == 27 && month == 9) { // Haunted Island
                eventName.innerHTML = "RACE: NYCRUNS Haunted Island 5K";
                eventMessage.innerHTML = "Governor's Island";
                eventDate.innerHTML += ", 8:00 AM";
            } else if(date == 3 && month == 10) { // Donuts
                eventName.innerHTML = "EVENT: NYC Marathon Volunteering";
                eventMessage.innerHTML = "Location TBD";
                eventDate.innerHTML += ", Time TBD";
            } else if(date == 16 && month == 10) { // Donuts
                eventName.innerHTML = "RACE: NYCRUNS Go Nuts for Donuts 10K";
                eventMessage.innerHTML = "Governor's Island";
                eventDate.innerHTML += ", 7:30 AM";
            } else if(date == 7 && month == 11) { // Cocoa
                eventName.innerHTML = "RACE: NYCRUNS Cocoa Classic 5K";
                eventMessage.innerHTML = "Prospect Park";
                eventDate.innerHTML += ", 8:00 AM";
            } else if(date == 14 && month == 11) { // Big Apple
                eventName.innerHTML = "RACE: NYCRUNS Big Apple 5K/HM";
                eventMessage.innerHTML = "Central Park";
                eventDate.innerHTML += ", 7:00 AM";
            } else if(date == 25 && month == 1) { // Central Park
                eventName.innerHTML = "RACE: NYCRUNS Central Park 5K/HM";
                eventMessage.innerHTML = "Central Park";
                eventDate.innerHTML += ", 8:00 AM";
            } else if(date == 10 && month == 2) { // Pi Day
                eventName.innerHTML = "RACE: NSRF Pi Day 3.14 Miler";
                eventMessage.innerHTML = "Flushing Meadows Corona Park";
                eventDate.innerHTML += ", 9:30 AM";
            } else if(date == 6 && month == 3) { // Spring Fling
                eventName.innerHTML = "RACE: NYCRUNS Spring Fling 5K/10K";
                eventMessage.innerHTML = "Governor's Island";
                eventDate.innerHTML += ", 8:30 AM";
            } else if(date == 14 && month == 3) { // Prospect Park
                eventName.innerHTML = "RACE: NYCRUNS Prospect Park 5K";
                eventMessage.innerHTML = "Prospect Park";
                eventDate.innerHTML += ", 9:00 AM";
            } else if(date == 28 && month == 3) { // Brooklyn Half
                eventName.innerHTML = "RACE: NYCRUNS Brooklyn Half Marathon";
                eventMessage.innerHTML = "Brooklyn";
                eventDate.innerHTML += ", 7:00 AM";
            } else if(dayOfWeek == 1) {
                eventName.innerHTML = "Strength Training";
                eventMessage.innerHTML = "Turf @ 404 Fitness"
                eventDate.innerHTML += ", 7:00 PM";
            } else if(dayOfWeek == 5) {
                eventName.innerHTML = "Strength Training";
                eventMessage.innerHTML = "Turf @ 404 Fitness"
                eventDate.innerHTML += ", 7:00 PM";
            } else {
                eventName.innerHTML = "Group Run";
                eventMessage.innerHTML = "Marsha P. Johnson Memorial Fountain"
                if(dayOfWeek = 2) eventDate.innerHTML += ", 6:00 PM";
                else eventDate.innerHTML += ", 10:00 AM";
            }


            eventsLoaded++;
        }
        today.setDate(today.getDate() + 1);
    }

};
