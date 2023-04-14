
// initilize variables
let configFileUrl = 'https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/config.json';
let configFile;
let config;

let classNames;
let bellOffset;
let bellOffsetSetting
let dismissedBanners;
let showJazz;
let showChamber;
let theme;
let showMilliseconds;

let eventsAPIRawUrl = "https://script.google.com/macros/s/AKfycbzRkbIrdc42LeKadHYe8DY2XhSvSGCMzmql0-2shS439Lyqj4D56jwMDBD3_-nFTEyCuw/exec";
let events;

let calendarOffsetWeeks = 0;

// update data functions
async function updateData(doUpdateOptions) {
  await updateConfig()
  if (doUpdateOptions) {
    updateOptions()
  }
  updateEventData()
}

async function updateConfig() {
  if (localStorage.config) {
    config = JSON.parse(localStorage.config);
    fetchConfig()
  } else {
    await fetchConfig();
  }
};

async function fetchConfig() {
  if (!window.navigator.onLine) return;
  configFile = fetch(addNoCache(configFileUrl));
  config = await configFile.then(res=>res.json());
  localStorage.config = JSON.stringify(config);
}

async function updateOptions() {
  if (!config) {
    await updateConfig()
  }

  try {
    chrome.storage.sync.get([
      'classNames',
      'bellOffsetSetting',
      'dismissedBanners',
      'showJazz',
      'showChamber',
      'theme',
      'showMilliseconds'
    ], res=>{
      if (res.classNames) {
        localStorage.classNames = JSON.stringify(res.classNames);
      } else {
        let tempClassNames = [];
        config.nameable_classes.forEach((item) => {
          tempClassNames.push({class:item, name:item});
        });
        chrome.storage.sync.set({classNames: tempClassNames});
        localStorage.classNames = JSON.stringify(tempClassNames);
      };

      if (res.bellOffsetSetting) {
        localStorage.bellOffsetSetting = JSON.stringify(res.bellOffsetSetting);
      } else {
        chrome.storage.sync.set({bellOffsetSetting: 'preset'});
        localStorage.bellOffsetSetting = JSON.stringify('preset');
      };

      if (res.dismissedBanners) {
        localStorage.dismissedBanners = JSON.stringify(res.dismissedBanners);
      } else {
        chrome.storage.sync.set({dismissedBanners: []});
        localStorage.dismissedBanners = JSON.stringify([]);
      };

      if (res.showJazz) {
        localStorage.showJazz = JSON.stringify(res.showJazz);
      } else {
        chrome.storage.sync.set({showJazz: false});
        localStorage.showJazz = JSON.stringify(false);
      };

      if (res.showChamber) {
        localStorage.showChamber = JSON.stringify(res.showChamber);
      } else {
        chrome.storage.sync.set({showChamber: false});
        localStorage.showChamber = JSON.stringify(false);
      };

      if (res.theme) {
        localStorage.theme = JSON.stringify(res.theme);
      } else {
        chrome.storage.sync.set({theme: 'use-system'});
        localStorage.theme = JSON.stringify('use-system');
      };

      if (res.showMilliseconds) {
        localStorage.showMilliseconds = JSON.stringify(res.showMilliseconds);
      } else {
        chrome.storage.sync.set({showMilliseconds: false});
        localStorage.showMilliseconds = JSON.stringify(false);
      };
    });
  } catch {
    if (!localStorage.classNames) {
      let tempClassNames = [];
      config.nameable_classes.forEach((item) => {
        tempClassNames.push({class:item, name:item});
      });
      localStorage.classNames = JSON.stringify(tempClassNames);
    };

    if (!localStorage.bellOffsetSetting) {
      localStorage.bellOffsetSetting = JSON.stringify('preset');
    };

    if (!localStorage.dismissedBanners) {
      localStorage.dismissedBanners = JSON.stringify([]);
    };

    if (!localStorage.showJazz) {
      localStorage.showJazz = JSON.stringify(false);
    };

    if (!localStorage.showChamber) {
      localStorage.showChamber = JSON.stringify(false);
    };

    if (!localStorage.theme) {
      localStorage.theme = JSON.stringify('use-system');
    };

    if (!localStorage.showMilliseconds) {
      localStorage.showMilliseconds = JSON.stringify(false);
    };
  };

  classNames = localStorage.classNames ? JSON.parse(localStorage.classNames) : undefined;
  if (!localStorage.bellOffsetSetting) {
    setTimeout(()=>updateOptions(),1e3)
    return
  } else if (JSON.parse(localStorage.bellOffsetSetting)=='preset') {
    bellOffset = config.bell_offset;
  } else {
    bellOffset = JSON.parse(localStorage.bellOffsetSetting);
  };
  bellOffsetSetting = JSON.parse(localStorage.bellOffsetSetting)
  dismissedBanners = JSON.parse(localStorage.dismissedBanners);
  showJazz = JSON.parse(localStorage.showJazz);
  showChamber = JSON.parse(localStorage.showChamber);
  theme = JSON.parse(localStorage.theme);
  showMilliseconds = JSON.parse(localStorage.showMilliseconds);
}

function setOption(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  try {
    chrome.storage.sync.set(JSON.parse('{'+JSON.stringify(key)+':'+JSON.stringify(value)+'}'))
  } catch {}
  updateOptions()
}

function updateEventData() {
  if (localStorage.events) {
    events = JSON.parse(localStorage.events);
  };

  if (!window.navigator.onLine) return;

  if (config.events.on) {
    fetch(addQueries(eventsAPIRawUrl, [
      {key:'id', value: config.events.id}, // TEMP: replace id with config.events.id
      {key:'time', value: adjustedTime().getTime()}
    ])).then(res=>res.json()).then(res=>{
      events = res;
      localStorage.events = JSON.stringify(events);
    });
  };
};

// current data functions
function adjustedTime() {
  let tempDate = new Date();
  tempDate.setSeconds(tempDate.getSeconds()-bellOffset);
  return tempDate;
}

function mondayDate(time) {
  let tempReturnDate = new Date(time);
  tempReturnDate.setDate(time.getDate()-time.getDay()+1)
  return tempReturnDate
}

function addCalendarOffset(time) {
  let tempReturnDate = new Date(time);
  tempReturnDate.setDate(time.getDate()+(calendarOffsetWeeks*7))
  return tempReturnDate
}

function weekType(time) {
  return config.week_schedule.find(item=>item.monday_date==monthDayYear(mondayDate(time)))?.schedule;
}

function dayType(time) {
  let tempDaySchedule = config.day_schedule.find(item=>item.date==monthDayYear(time));
  if (tempDaySchedule) {
    return tempDaySchedule.schedule
  }
  let tempReturnData = weekSchedule(weekType(time))
  if (tempReturnData) {
    return tempReturnData.schedule[time.getDay()];
  }

}

function weekSchedule(type) {
  return config.week_types.find(item=>item.name==type);
}

function dayInfo(type) {
  return config.day_types.find(item=>item.name==type);
}

function nextPeriod(time) {
  let tempTimeString = hourMinute(time);
  let tempDayScheduleList = dayInfo(dayType(time))
  if (!tempDayScheduleList) return;
  tempDayScheduleList = Array.from(tempDayScheduleList.schedule)

  if (tempDayScheduleList.length == 0 || timeCompare(tempTimeString, tempDayScheduleList.at(-1).time, '>=')) { // if past end of day
    for (let i = 0; i < 365; i++) {
      let tempDate = new Date(time);
      tempDate.setDate(tempDate.getDate()+i+1)

      if (dayInfo(dayType(tempDate)).schedule.length > 0) {
        let tempReturnInfo = JSON.parse(JSON.stringify(dayInfo(dayType(tempDate)).schedule.at(0)));
        tempReturnInfo.dateObject = new Date(monthDayYear(tempDate)+','+tempReturnInfo.time);
        return tempReturnInfo;
      }
    }
  } else if (timeCompare(tempTimeString, tempDayScheduleList.at(0).time, '<')) { // if before start of day
    let tempReturnInfo = JSON.parse(JSON.stringify(tempDayScheduleList.at(0)));
    tempReturnInfo.dateObject = new Date(monthDayYear(time)+','+tempReturnInfo.time);
    return tempReturnInfo;
  } else { // if during the day
    for (let i = 0; i < tempDayScheduleList.length; i++) {
      if (timeCompare(tempTimeString, tempDayScheduleList[i].time, '<')) {
        let tempReturnInfo = JSON.parse(JSON.stringify(tempDayScheduleList.at(i)));
        tempReturnInfo.dateObject = new Date(monthDayYear(time)+','+tempReturnInfo.time);
        return tempReturnInfo;
      }
    };
  };
}

function prevPeriod(time) {
  let tempTimeString = hourMinute(time);
  let tempDayScheduleList = dayInfo(dayType(time))?.schedule;
  if (!tempDayScheduleList) return;

  if (tempDayScheduleList.length == 0 || timeCompare(tempTimeString, tempDayScheduleList.at(0).time, '<')) { // before
    // throw "Not yet implemented"
    for (let i = 0; i < 365; i++) { // TEMP: Change to i < 365
      let tempDate = new Date(time);
      tempDate.setDate(tempDate.getDate()-i-1)
      if (dayInfo(dayType(tempDate)).schedule.length > 0) {
        return dayInfo(dayType(tempDate)).schedule.at(-1);
      }
    }
  } else if (timeCompare(tempTimeString, tempDayScheduleList.at(-1).time, '>')) { // after
    return tempDayScheduleList.at(-1);
  } else {  // during
    for (var i = 0; i < tempDayScheduleList.length; i++) {
      if (timeCompare(tempTimeString, tempDayScheduleList[i].time, '<')) {
        return tempDayScheduleList.at(i-1)
      }
    }
    return 3
  }
}

function getCustomClassName(name) {

  if (!config.nameable_classes.includes(name)) {
    return name;
  }
  let tempReturnData = localStorage.classNames ? JSON.parse(localStorage.classNames).find(item=>item.class == name)?.name : undefined;
  return tempReturnData ? tempReturnData : name;
}

function isJazzDay(time) {
  return config.jazz_days.includes(monthDayYear(time))
}

function isChamberDay(time) {
  return config.chamber_days.includes(monthDayYear(time))
}

async function getManifest() {
  try {
    return chrome.runtime.getManifest();
  } catch (e) {
    return await fetch('https://www.silasbartol.com/MCHS_Schedule/manifest.json').then(res=>res.json())
  }
}

async function getVersion() {
  return await getManifest().then(res=>res.version)
}

// utility functions
function addNoCache(url) {
  return url + '?nocache='+(Math.random()+'').replace('.','');
};

function addQueries(url, queries) {
  let tempFullUrl = url + "?"
  queries.forEach((item) => {
    tempFullUrl += item.key + "=" + item.value + "&"
  });
  tempFullUrl = tempFullUrl.slice(0, -1);
  return tempFullUrl;

}

function monthDayYear(time) {
  return (time.getMonth()+1).toString()+'/'+(time.getDate()).toString()+'/'+(time.getFullYear()).toString();
}

function hourMinute(time) {
  return time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0')
}

function hourMinute12(time, showAMPM) {
  if (!time) {
    return
  }
  if (showAMPM) {
    if (time.getHours()<12) {
      return time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0') + " AM"
    } else if (time.getHours()>12) {
      return  (time.getHours()-12) + ':' + time.getMinutes().toString().padStart(2, '0') + " PM"
    } else if (time.getHours()==12) {
      return  time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0') + " AM"
    }
  } else {
    if (time.getHours()<=12) {
      return time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0')
    } else if (time.getHours()>12) {
      return  (time.getHours()-12) + ':' + time.getMinutes().toString().padStart(2, '0')
    }
  }

}

function timeCompare(timeString1, timeString2, method) {

  let tempDate1 = new Date('1/1/2001, '+ timeString1);
  let tempDate2 = new Date('1/1/2001, '+ timeString2);
  if (method == '>') {
    return tempDate1 > tempDate2;
  } else if (method == '<') {
    return tempDate1 < tempDate2;
  } else if (method == '==') {
    return tempDate1 == tempDate2;
  } else if (method == '>=') {
    return tempDate1 >= tempDate2;
  } else if (method == '<=') {
    return tempDate1 <= tempDate2;
  } else {
    throw "invalid timeCompare meathod"
  };
}

function versionNumberCompare(version1, version2, method) {
  let tempVersion1List = version1.split('.');
  let tempVersion2List = version2.split('.');

  tempVersion1List.forEach((item, i) => tempVersion1List[i] = parseInt(item));
  tempVersion2List.forEach((item, i) => tempVersion2List[i] = parseInt(item));

  let tempMaxLength = tempVersion1List.length > tempVersion2List.length ? tempVersion1List.length : tempVersion2List.length;

  let tempVersion1Sum = 0;
  tempVersion1List.forEach((item, i) => {
    tempVersion1Sum += (2**(tempMaxLength - i - 1)) * (item > tempVersion2List[i] || i >= tempVersion2List.length);
  });

  let tempVersion2Sum = 0;
  tempVersion2List.forEach((item, i) => {
    tempVersion2Sum += (2**(tempMaxLength - i - 1)) * (item > tempVersion1List[i] || i >= tempVersion1List.length);
  });

  if (method == '>') {
    return tempVersion1Sum > tempVersion2Sum;
  } else if (method == '<') {
    return tempVersion1Sum < tempVersion2Sum;
  } else if (method == '==') {
    return tempVersion1Sum == tempVersion2Sum;
  } else if (method == '>=') {
    return tempVersion1Sum >= tempVersion2Sum;
  } else if (method == '<=') {
    return tempVersion1Sum <= tempVersion2Sum;
  } else {
    throw "invalid versionNumberCompare meathod"
  };
}

function getQueryStringParameters() {
  let parameters = location.search.split('&');
  parameters[0] = parameters[0].slice(1);
  parameters.forEach((item, i) => {
    let parts = item.split('=');
    parameters[i] = ("\""+parts[0]+"\":\""+parts[1]+"\"");
  });
  parameters = JSON.parse("{"+parameters.join(', ')+"}")
  return parameters;
}
