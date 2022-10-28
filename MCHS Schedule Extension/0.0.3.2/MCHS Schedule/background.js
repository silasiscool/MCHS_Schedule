// fetch config file
const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/schedules.json?nocache='+(Math.random()+'').replace('.','')).then(res => res.json());

// set default options on install
chrome.runtime.onInstalled.addListener((e) => {
  console.log(e.reason);
  if (e.reason === 'install') { // pre exsting options

    // set default class names options
    config_file.then((config) => {
      const nameableClasses = config.nameable_classes;
      let classNames = []
      nameableClasses.forEach((item) => {
        classNames.push({class:item, name:item})
      });
      chrome.storage.sync.set({classNames: classNames})
    })

    // set other options
    chrome.storage.sync.set({
      bellOffsetSetting : 'preset',
      reduceMotion : false,
      dismissedBanners : []
    })
  }
  // new options with update
  chrome.storage.sync.set({
    showJazz: false,
    showChamber: false
  })


});
