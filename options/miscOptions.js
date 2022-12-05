let reduceMotionCheckbox = document.getElementById('reduce-motion');
let showChamber = document.getElementById('show-chamber');
let showJazz = document.getElementById('show-jazz');
let useSystemThemeSetting = document.getElementById('use-system-theme-setting');
let lightThemeSetting = document.getElementById('light-theme-setting');
let darkThemeSetting = document.getElementById('dark-theme-setting');
let doReloads = document.getElementById('do-reloads');
let sendNotif = document.getElementById('send-notif');

try {
  chrome.storage.sync.get(['reduceMotion','showChamber','showJazz', 'theme', 'autoReload', 'periodNotify'], (res) => {
    mainMiscOptions(res)
  })
} catch (e) {
  mainMiscOptions({
    reduceMotion: ('true' === localStorage.getItem('reduceMotion')),
    showChamber: ('true' === localStorage.getItem('showChamber')),
    showJazz: ('true' === localStorage.getItem('showJazz')),
    theme: localStorage.getItem('theme'),
    autoReload: JSON.parse(localStorage.getItem('autoReload')),
    periodNotify: JSON.parse(localStorage.getItem('periodNotify'))
  })
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

  doReloads.checked = res.autoReload;

  if (res.periodNotify===false) {
    sendNotif.checked = false;
  } else {
    sendNotif.checked = true;
  }
}

function saveValues() {
  // function notify(notifText) {
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //
  //   } else if (Notification.permission === "granted") {
  //     const notification = new Notification(notifText);
  //
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         const notification = new Notification(notifText);
  //       }
  //     });
  //   }
  // }

  if (sendNotif.checked) {
    if (!("Notification" in window)) {
      sendNotif.checked = false;
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // All set, do nothing
    } else if (Notification.permission === "denied") {
      sendNotif.checked = false;
      alert("Notification permissions have been denied, please reset permissions to continue")
    } else {
      Notification.requestPermission().then((perm) => {
        console.log(perm);
        if (perm !== "granted") {
          sendNotif.checked = false;
          alert("Notification permissions have been denied, please reset permissions to continue")
        }
      }).then(() => saveValues())
    }
  }


  let themeSetting = 'use-system';
  if (lightThemeSetting.checked) {
    themeSetting = 'light';
  } else if (darkThemeSetting.checked) {
    themeSetting = 'dark';
  };
  let periodNotifySetting
  if (sendNotif.checked) {
    periodNotifySetting = 5;
  } else {
    periodNotifySetting = false;
  };

  try {
    chrome.storage.sync.set({
      reduceMotion: reduceMotionCheckbox.checked,
      showChamber: showChamber.checked,
      showJazz: showJazz.checked,
      theme: themeSetting,
      autoReload: doReloads.checked,
      periodNotify: periodNotifySetting
    });

  } catch (e) {
    localStorage.setItem('reduceMotion', reduceMotionCheckbox.checked);
    localStorage.setItem('showChamber', showChamber.checked);
    localStorage.setItem('showJazz', showJazz.checked);
    localStorage.setItem('theme', themeSetting);
    localStorage.setItem('autoReload', JSON.stringify(doReloads.checked));
    localStorage.setItem('periodNotify', JSON.stringify(periodNotifySetting));
  };

};


[
  reduceMotionCheckbox,
  showChamber,
  showJazz,
  submitButton,
  useSystemThemeSetting,
  lightThemeSetting,
  darkThemeSetting,
  doReloads,
  sendNotif
].forEach((item) => {
  item.addEventListener('change', saveValues)
});
