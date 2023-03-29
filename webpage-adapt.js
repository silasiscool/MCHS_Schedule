// Detect enviorment
if (window.chrome && chrome.runtime && chrome.runtime.id) {
  console.log('Running in Chrome Extension');
} else {
  console.log('Running in Web enviorment');

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
  if (localStorage.getItem('autoReload') === null) {
    localStorage.setItem('autoReload', JSON.stringify(true))
    needReload = true;
  }
  if (localStorage.getItem('periodNotify') === null) {
    localStorage.setItem('periodNotify', JSON.stringify(false))
    needReload = true;
  }

  // if options changed
  if (needReload) {
    location.reload()
  }
}

let parameters = location.search.split('&');
parameters[0] = parameters[0].slice(1);
parameters.forEach((item, i) => {
  let parts = item.split('=');
  parameters[i] = ("\""+parts[0]+"\":\""+parts[1]+"\"");
});
parameters = JSON.parse("{"+parameters.join(', ')+"}")
if (parameters.theme == 'dark') {
  localStorage.setItem('theme', 'dark')
} else if (parameters.theme == 'light') {
  localStorage.setItem('theme', 'light')
} else {
  localStorage.setItem('theme', 'use-system')
}
