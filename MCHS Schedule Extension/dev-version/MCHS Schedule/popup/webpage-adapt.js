let schedulePopup = document.getElementById('schedule-popup')
let body = document.getElementsByTagName('body')[0]
let scheduleButton = document.getElementById('menu-button')

if (window.chrome && chrome.runtime && chrome.runtime.id) {
  console.log('Running in Chrome Extension');
} else {
  console.log('Running in other enviorment');
  schedulePopup.style.position = 'static'
  body.classList.add('full-width-body')
  scheduleButton.style.display = 'none'
}
