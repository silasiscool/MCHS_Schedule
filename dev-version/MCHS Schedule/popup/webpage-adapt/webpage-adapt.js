// Store Elements
let body = document.getElementsByTagName('body')[0]
let schedulePopup = document.getElementById('schedule-popup')
// let banner = document.getElementById('banner')

// Detect enviorment
if (window.chrome && chrome.runtime && chrome.runtime.id) {
  console.log('Running in Chrome Extension');
} else {
  console.log('Running in Web enviorment');

  // Dev
  // request permission on page load
  document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
  });

  function notifyMe() {
    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('Notification title', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: "Hey there! You've been notified!",
      });

      notification.onclick = function() {
        window.open("http://stackoverflow.com/a/13328397/1269037");
      };
    }
  }

  document.getElementsByTagName('a').forEach((item, i) => {
    item.addEventListener('click', () => {
      notifyMe()
    })
  });

  // End Dev

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
