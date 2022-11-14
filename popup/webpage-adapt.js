// Store elements
let schedulePopup = document.getElementById('schedule-popup')
let body = document.getElementsByTagName('body')[0]
let scheduleButton = document.getElementById('schedule-button')
// let banner = document.getElementById('banner')

// Detect enviorment
if (window.chrome && chrome.runtime && chrome.runtime.id) {
  console.log('Running in Chrome Extension');
} else {
  console.log('Running in Web enviorment');

  // Set default options
  let needReload = false
  if (localStorage.getItem('classNames') === null) {
    config_file.then((config) => {
      const nameableClasses = config.nameable_classes;
      let classNames = []
      nameableClasses.forEach((item) => {
        classNames.push({class:item, name:item})
      });
      localStorage.setItem('classNames', JSON.stringify(classNames))
      location.reload()
    })
  }
  if (localStorage.getItem('bellOffsetSetting') === null) {
    localStorage.setItem('bellOffsetSetting', 'preset')
    needReload = true;
  }
  if (localStorage.getItem('reduceMotion') === null) {
    localStorage.setItem('reduceMotion', false)
    needReload = true;
  }
  if (localStorage.getItem('dismissedBanners') === null) {
    localStorage.setItem('dismissedBanners', JSON.stringify([]))
    needReload = true;
  }
  if (localStorage.getItem('showJazz') === null) {
    localStorage.setItem('showJazz', false)
    needReload = true;
  }
  if (localStorage.getItem('showChamber') === null) {
    localStorage.setItem('showChamber', false)
    needReload = true;
  }
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'use-system')
    needReload = true;
  }

  // if options changed
  if (needReload) {
    location.reload()
  }



  // Change schedule display
  schedulePopup.style.position = 'static'
  body.classList.add('full-width-body')
  body.style.transition = 'none'
  scheduleButton.style.display = 'none'

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
  body.style.transformOrigin = '0 0'
  body.style.overflow = 'hidden'
  if (widthScale <= heightScale) {
    body.style.scale = widthScale
  } else {
    body.style.scale = heightScale
  }
}
