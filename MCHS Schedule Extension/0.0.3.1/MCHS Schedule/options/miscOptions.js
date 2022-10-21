let reduceMotionCheckbox = document.getElementById('reduce-motion')

chrome.storage.sync.get(['reduceMotion'], (res) => {
  if (res.reduceMotion) {
    reduceMotionCheckbox.checked = true
  } else {
    reduceMotionCheckbox.checked = false
  }
  console.log(res.reduceMotion);
})

function saveValues() {
  chrome.storage.sync.set({reduceMotion: reduceMotionCheckbox.checked})
}

reduceMotionCheckbox.addEventListener('change', saveValues)
submitButton.addEventListener('change', saveValues)
