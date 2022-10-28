// fetch config file
const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/schedules.json?nocache='+(Math.random()+'').replace('.','')).then(res => res.json());

// set default options on install
chrome.runtime.onInstalled.addListener((e) => {
  console.log(e.reason);
  if (e.reason === 'install') { // pre exsting options

  }
  // new options with update

  // set default class names options
  config_file.then((config) => {
    const nameableClasses = config.nameable_classes;
    let classNames = []
    nameableClasses.forEach((item) => {
      classNames.push({class:item, name:item})
    });
    chrome.storage.sync.set({classNames: classNames})
  })

  // set bell offset options
  chrome.storage.sync.set({bellOffsetSetting : 'preset'})

  // set reduce motion option
  chrome.storage.sync.set({reduceMotion : false})

  // set dissmissed banners
  chrome.storage.sync.set({dismissedBanners : []})

});

// chrome.storage.sync.clear()
