// Store elements
let schedulePopup = document.getElementById('schedule-popup')
let body = document.getElementsByTagName('body')[0]
let scheduleButton = document.getElementById('menu-button')

// Store variables
let fullWidth = 700;
let fullHeight = 500;

// Detect enviorment
if (window.chrome && chrome.runtime && chrome.runtime.id) {
  console.log('Running in Chrome Extension');
} else {
  console.log('Running in other enviorment');

  // Change schedule display
  schedulePopup.style.position = 'static'
  body.classList.add('full-width-body')
  scheduleButton.style.display = 'none'

  // Scale to fit
  addEventListener('resize', setScale)
  setScale()
}

function setScale() {
  let widthScale = window.innerWidth/fullWidth
  let heightScale = window.innerHeight/fullHeight
  body.style.transformOrigin = '0 0'
  body.style.overflow = 'hidden'
  if (widthScale <= heightScale) {
    body.style.scale = widthScale
  } else {
    body.style.scale = heightScale
  }
}
