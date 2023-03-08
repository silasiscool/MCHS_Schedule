let showEvents = false

let eventsBox = document.getElementById('events-box');
let mainSection = document.getElementById('main-section')

config_file.then(config=>{
  if (config.events.on) {
    eventsBox.style.display = 'block';



    fetchData(config.events.id, Date.now())

  } else {

  };
  document.body.classList.add('width-transition')
  mainSection.classList.add('position-transition')
  setTimeout(function () {

  }, 10);
})


function fetchData(id, time) {
  let url = "https://script.google.com/macros/s/AKfycbyG1i98hFZGmKREDyiVukVmhIuxOv7mE-b8eQG5qu3HAa_ipWMTWqTM4AvoVgzkzrjcdw/exec?id="+id+"&time="+time;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        dataReceive(JSON.parse(xhr.responseText));
     }};

  xhr.send();
}

function dataReceive(events) {
  if (events.length<=0) {
    return
  }
  events.forEach((event) => {
    let eventItem = document.createElement('div')
    eventItem.classList.add('event-item')
    let eventDate = document.createElement('div')
    eventDate.classList.add('event-date')
    eventDate.appendChild(document.createTextNode(event.date))
    let eventName = document.createElement('div')
    eventName.classList.add('event-name')
    eventName.appendChild(document.createTextNode(event.title))

    eventItem.appendChild(eventDate)
    eventItem.appendChild(eventName)
    eventsBox.appendChild(eventItem)
  });


  if (!document.body.classList.contains('full-width-body'))
    mainSection.classList.add('float-right');
  document.body.classList.add('full-width-body');
  showEvents = true
}
