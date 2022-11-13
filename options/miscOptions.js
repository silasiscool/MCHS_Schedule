let reduceMotionCheckbox = document.getElementById('reduce-motion');
let showChamber = document.getElementById('show-chamber');
let showJazz = document.getElementById('show-jazz');
let useSystemThemeSetting = document.getElementById('use-system-theme-setting');
let lightThemeSetting = document.getElementById('light-theme-setting');
let darkThemeSetting = document.getElementById('dark-theme-setting');

try {
  chrome.storage.sync.get(['reduceMotion','showChamber','showJazz', 'theme'], (res) => {
    mainMiscOptions(res)
  })
} catch (e) {
  mainMiscOptions({
    reduceMotion: ('true' === localStorage.getItem('reduceMotion')),
    showChamber: ('true' === localStorage.getItem('showChamber')),
    showJazz: ('true' === localStorage.getItem('showJazz')),
    theme: localStorage.getItem('theme')})
}

function mainMiscOptions(res) {
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

  if (res.theme === 'light') {
    lightThemeSetting.checked = true;
  } else if (res.theme === 'dark') {
    darkThemeSetting.checked = true;
  } else {
    useSystemThemeSetting.checked = true;
  }
}

function saveValues() {
  let themeSetting = 'use-system';
  if (lightThemeSetting.checked) {
    themeSetting = 'light';
  } else if (darkThemeSetting.checked) {
    themeSetting = 'dark';
  }

  try {
    chrome.storage.sync.set({
      reduceMotion: reduceMotionCheckbox.checked,
      showChamber: showChamber.checked,
      showJazz: showJazz.checked,
      theme: themeSetting
    })
  } catch (e) {
    localStorage.setItem('reduceMotion', reduceMotionCheckbox.checked)
    localStorage.setItem('showChamber', showChamber.checked)
    localStorage.setItem('showJazz', showJazz.checked)
    localStorage.setItem('theme', themeSetting)
  }

}


[
  reduceMotionCheckbox,
  showChamber,
  showJazz,
  submitButton,
  useSystemThemeSetting,
  lightThemeSetting,
  darkThemeSetting
].forEach((item) => {
  item.addEventListener('change', saveValues)
});
