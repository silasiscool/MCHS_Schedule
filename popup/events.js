let showEvents = false

let eventsBox = document.getElementById('events-box');
let mainSection = document.getElementById('main-section')

config_file.then(config=>{
  if (config.events.on)
    fetchData(config.events.id, Date.now())
})


function fetchData(id, time) {
  console.log('fetching events...')
  let apiURL = "https://script.google.com/macros/s/AKfycbzRkbIrdc42LeKadHYe8DY2XhSvSGCMzmql0-2shS439Lyqj4D56jwMDBD3_-nFTEyCuw/exec"
  let url = apiURL+"?id="+id+"&time="+time;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        dataReceive(JSON.parse(xhr.responseText));
     }};

  xhr.send();
}

function dataReceive(events) {
  console.log(events)
  if (events.length<=0) {
    return
  }
  events.forEach((event) => {
    let eventDate = document.createElement('div')
    eventDate.classList.add('event-date', 'event-item')

    if (event.endDate) {
      eventDate.classList.add('multiday-event')
      eventDate.appendChild(document.createTextNode(event.date))
      eventDate.innerHTML += "<br>"
      eventDate.appendChild(document.createTextNode(event.endDate))
    } else {
      eventDate.appendChild(document.createTextNode(event.date))
    }

    let eventName = document.createElement('div')
    eventName.classList.add('event-name', 'event-item')
    eventName.appendChild(document.createTextNode(event.title))
    let eventBorder = document.createElement('div')
    eventBorder.classList.add('event-border');

    eventsBox.appendChild(eventDate);
    eventsBox.appendChild(eventName);
    eventsBox.appendChild(eventBorder)
  });

  if (!document.body.classList.contains('full-width-body') || mainSection.classList.contains('web-adapt'))
    mainSection.classList.add('float-right');
  document.body.classList.add('full-width-body');
  document.getElementById('schedule-button').classList.add('events-open');
  showEvents = true
}
