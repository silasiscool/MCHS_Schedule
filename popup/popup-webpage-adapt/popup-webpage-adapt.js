// Store Elements
let body = document.getElementsByTagName('body')[0]
let schedulePopup = document.getElementById('schedule-popup')
// let banner = document.getElementById('banner')

// Detect enviorment
if (window.chrome && chrome.runtime && chrome.runtime.id) {
} else {
  // Change display
  document.querySelectorAll('*').forEach((item, i) => {
    item.classList.add('web-adapt')
  });
  body.classList.add('full-width-body')

  // Scale to fit
  addEventListener('resize', setScale)
  setScale()

  // reload on change
  addEventListener('storage', (event) => {
    location.reload()
  });


}

function setScale() {
  let width = body.clientWidth
  let height = body.clientHeight
  if (Array.from(banner.classList).includes('active-banner')) {
    height += banner.clientHeight
  }
  let widthScale = window.innerWidth/width
  let heightScale = window.innerHeight/height
  if (widthScale <= heightScale) {
    body.style.scale = widthScale
    body.classList.add('tall')
    body.classList.remove('wide')
  } else {
    body.style.scale = heightScale
    body.classList.remove('tall')
    body.classList.add('wide')
  }
}
