// element variables
let html = document.querySelector('html')
let body = document.body
let root = document.querySelector(':root')

// css variables
let minWidth = 700;
let maxWidth = 980;
let fullHeight = 500;

// Interval variables and start & stop functions
let fastUpdateInterval;
let slowUpdateInterval;

function startIntervals() {
  fastUpdateInterval = setInterval(fastUpdate, 10);
  slowUpdateInterval = setInterval(slowUpdate, 1e3);
}

function stopIntervals() {
  clearInterval(fastUpdateInterval);
  clearInterval(slowUpdateInterval);
}

// start
updateData(true)
fastUpdate()
slowUpdate()
startIntervals()

setTimeout(function () {
  document.body.classList.remove('initializing');
}, 1e2);

window.addEventListener('online', () => updateData(true));

window.addEventListener("resize", setScaleAndBorder);

// document.body.style.scale = '2'



// update visuals
function setScaleAndBorder() {

  if (
    html.clientHeight != body.clientHeight
    || html.clientWidth != body.clientWidth
  ) {
    body.classList.add('full-page')
  }
}

function fastUpdate() {
  if (config) {
    updateMainPanel()
    updateSchedulePanel()
    if (['light', 'dark', 'use-system'].includes(getQueryStringParameters().theme)) {
      theme = getQueryStringParameters().theme
    } 
    useSetTheme()
  }
  if (events) {
    updateEventsPanel()
  }
}

function slowUpdate() {
  if (!window.navigator.onLine && localStorage.length == 0) {
    document.body.classList.add('no-offline-data')
  } else if (localStorage.length == 0) {
    updateData(true);
  } else {
    document.body.classList.remove('no-offline-data')
  }

  updateData(false)
  updateBanner()
  setScaleAndBorder()

}







// if (parameters.theme == 'dark') {
//   localStorage.setItem('theme', 'dark')
// } else if (parameters.theme == 'light') {
//   localStorage.setItem('theme', 'light')
// } else {
//   localStorage.setItem('theme', 'use-system')
// }
