// fetch config file
// const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/config.json?nocache='+(Math.random()+'').replace('.','')).then(res => res.json());

// set default options on install
chrome.runtime.onInstalled.addListener((e) => {
  console.log(e.reason);
  // set options
  chrome.storage.sync.get(['classNames', 'bellOffsetSetting', 'reduceMotion', 'dismissedBanners', 'showJazz', 'showChamber', 'theme', 'autoReload', 'periodNotify'], (res) => {
    if (res.classNames === undefined) {
      config_file.then((config) => {
        const nameableClasses = config.nameable_classes;
        let classNames = []
        nameableClasses.forEach((item) => {
          classNames.push({class:item, name:item})
        });
        chrome.storage.sync.set({classNames: classNames})
      })
    }
    if (res.bellOffsetSetting === undefined) {
      chrome.storage.sync.set({bellOffsetSetting: 'preset'})
    }
    if (res.reduceMotion === undefined) {
      chrome.storage.sync.set({reduceMotion: false})
    }
    if (res.dismissedBanners === undefined) {
      chrome.storage.sync.set({dismissedBanners: []})
    }
    if (res.showJazz === undefined) {
      chrome.storage.sync.set({showJazz: false})
    }
    if (res.showChamber === undefined) {
      chrome.storage.sync.set({showChamber: false})
    }
    if (res.theme === undefined) {
      chrome.storage.sync.set({theme: 'use-system'})
    }
    if (res.autoReload === undefined) {
      chrome.storage.sync.set({autoReload: false})
    }
    if (res.periodNotify === undefined) {
      chrome.storage.sync.set({periodNotify: false})
    }
  })
});


// function test() {
//   // chrome.alarms.create('test', Date.now() + 5e3)
//   // window.open('https://www.google.com', '_blank');
// }

// ServiceWorkerRegistration.showNotification('hello')
