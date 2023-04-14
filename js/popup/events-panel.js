let eventsPanel = document.getElementById('events-panel');

eventsPanel.addEventListener('click', () => eventsPanel.classList.toggle('show'));
document.getElementById('main-panel').addEventListener('click', () => eventsPanel.classList.remove('show'));

function updateEventsPanel() {
  eventsPanel.innerHTML = "";
  events.forEach((item) => {
    let tempEventTime = document.createElement('div');
    tempEventTime.classList.add('event-item', 'event-date', 'list-item', 'list-time')
    tempEventTime.textContent = item.date;
    if (item.endDate) {
      tempEventTime.classList.add('has-end-date');
      tempEventTime.innerHTML += '<br>' + item.endDate;
    };
    eventsPanel.appendChild(tempEventTime);

    let tempEventName = document.createElement('div');
    tempEventName.classList.add('event-item', 'event-name', 'list-item', 'list-name')
    tempEventName.textContent = item.title;
    eventsPanel.appendChild(tempEventName);

    let tempBorder = document.createElement('div');
    eventsPanel.appendChild(tempBorder);
    tempBorder.classList.add('event-item', 'event-border', 'list-item', 'list-border')
  });
  eventsPanel.dataset.length = events.length;

  if (eventsPanel.dataset.length == 0) {
    let tempListEmptyMessage = document.createElement('h2');
    tempListEmptyMessage.innerHTML = 'No Upcoming Events <br> <br> Let me know if there are any events you feel should be added';
    tempListEmptyMessage.classList.add('list-empty-message')
    eventsPanel.appendChild(tempListEmptyMessage);
  }

}
