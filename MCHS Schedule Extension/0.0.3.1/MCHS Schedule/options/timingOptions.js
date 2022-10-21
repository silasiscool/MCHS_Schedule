let noOffset = document.getElementById('no-offset');
let customOffset = document.getElementById('custom-offset');
let presetOffset = document.getElementById('preset-offset');
let customOffsetSeconds = document.getElementById('custom-offset-seconds');
let presetOffsetLabel = document.getElementById('preset-offset-label')
let submitButton = document.getElementById('submit-button');


chrome.storage.sync.get(['bellOffsetSetting'], (res) => {
  if (res.bellOffsetSetting === 0) {
    noOffset.checked = true
  } else if (res.bellOffsetSetting === 'preset') {
    presetOffset.checked = true
  } else {
    customOffset.checked = true
    customOffsetSeconds.value = res.bellOffsetSetting
  }
})

const bellOffsetFile = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/bell_offset.json').then(res => res.json());
bellOffsetFile.then((bellOffset) => {
  presetOffsetLabel.textContent += ' : ' + bellOffset.bell_offset + ' seconds'
})


function saveValues() {
  let offsetAmmount = 0
  if (noOffset.checked) {
    offsetAmmount = 0
  } else if (customOffset.checked) {
    offsetAmmount = customOffsetSeconds.value
  } else if (presetOffset.checked) {
    offsetAmmount = 'preset'
  }
  console.log(offsetAmmount);
  chrome.storage.sync.set({bellOffsetSetting: offsetAmmount})
}

noOffset.addEventListener('change', saveValues)
customOffset.addEventListener('change', saveValues)
presetOffset.addEventListener('change', saveValues)
customOffsetSeconds.addEventListener('change', saveValues)
submitButton.addEventListener('click', saveValues)
