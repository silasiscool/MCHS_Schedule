let reduceMotionCheckbox = document.getElementById('reduce-motion')
let showChamber = document.getElementById('show-chamber')
let showJazz = document.getElementById('show-jazz')

chrome.storage.sync.get(['reduceMotion','showChamber','showJazz'], (res) => {
  if (res.reduceMotion) {
    reduceMotionCheckbox.checked = true
  } else {
    reduceMotionCheckbox.checked = false
  }

  if (res.showChamber) {
    showChamber.checked = true
  }
  if (res.showJazz) {
    showJazz.checked = true
  }
})

function saveValues() {
  chrome.storage.sync.set({
    reduceMotion: reduceMotionCheckbox.checked,
    showChamber: showChamber.checked,
    showJazz: showJazz.checked
  })
}

reduceMotionCheckbox.addEventListener('change', saveValues)
showChamber.addEventListener('change', saveValues)
showJazz.addEventListener('change', saveValues)
submitButton.addEventListener('change', saveValues)
