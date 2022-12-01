const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/config.json?nocache='+(Math.random()+'').replace('.','')).catch((e) => {
  document.getElementById('end-time-box').innerHTML = 'Loading failed<br>Check Internet Connection'
  document.getElementById('menu-button').hidden = true
}).then(res => res.json());

// date offset
let weekCalendarOffset = 0

// apply reduce motion settings
try {
  chrome.storage.sync.get(['reduceMotion'], (res) => {
    reduceMotionSettingPopup(res.reduceMotion)
  })
} catch (e) {
  reduceMotionSettingPopup('true' === localStorage.getItem('reduceMotion'))
}

function reduceMotionSettingPopup(x) {
  if (x) {
    let elements = document.querySelectorAll('*')
    elements.forEach((item) => {
      item.classList.add('reduceMotion')
    });
  }
}

let timeOffset = 0

try {
  chrome.storage.sync.get(['bellOffsetSetting'], (res) => {
    mainPopup(res)
  })
} catch (e) {
  mainPopup({bellOffsetSetting: localStorage.getItem('bellOffsetSetting')})
}

function mainPopup(res) {
  config_file.then((presetBellOffset) => {
    // set timeOffset
    if (res.bellOffsetSetting === 'preset') {
      timeOffset = presetBellOffset.bell_offset
    } else {
      timeOffset = res.bellOffsetSetting
    }

    // store dates
    let currentDate = new Date(new Date(new Date().setSeconds(new Date().getSeconds()-timeOffset)).setDate(new Date().getDate()));
    const mondayDate = new Date(new Date(currentDate).setDate(currentDate.getDate()-currentDate.getDay()+1));

    // store elements
    const calendarBoxes = Array.from(document.getElementsByClassName('calendar-box'));
    const dateBox = document.getElementById('date-box');
    const dayTypeBox = document.getElementById('day-type-box');
    const classBox = document.getElementById('class-box');
    const timeBox = document.getElementById('time-box');
    const endTimeBox = document.getElementById('end-time-box')

    // create function to convert date object to mm/dd/yy form
    function monthDayYear(date) {
      return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    };

    // set date box
    dateBox.textContent = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date(currentDate).getDay()]+', '+monthDayYear(new Date(currentDate));

    // set all fields related to config_file contents
    config_file.then((config) => {
      // store parts of config_file
      const daySchedule = config.day_schedule;
      const dayTypes = config.day_types;
      const weekSchedule = config.week_schedule;
      const weekTypes = config.week_types;
      const nameableClasses = config.nameable_classes;

      // store current information
      let normalDayName = true;

      let currentDayType = daySchedule.find((object) => object.date === monthDayYear(currentDate));
      let currentWeekType = weekSchedule.find((object) => object.monday_date === monthDayYear(mondayDate));
      if (currentWeekType === undefined) {
        currentWeekType = {schedule: 'vacation_week'}
      }
      const currentWeekSchedule = weekTypes.find((object) => object.name === currentWeekType.schedule);
      if (currentDayType === undefined) {
        currentDayType = currentWeekSchedule.schedule[currentDate.getDay()];
      } else {
        if (currentDayType.alt_name !== undefined) {
          normalDayName = false;
          dayTypeBox.textContent = currentDayType.alt_name;
        }
        currentDayType = currentDayType.schedule;
      };
      const currentDaySchedule = dayTypes.find((object) => object.name === currentDayType);


      calendarBoxes.forEach((calendarBox, i) => { // do following for each box
        // get type of day for each box
        const boxDate = new Date(new Date(mondayDate).setDate(mondayDate.getDate()+i+(weekCalendarOffset*7)));
        let boxDayType = daySchedule.find((object) => object.date === monthDayYear(boxDate));
        if (boxDayType === undefined) {
          let boxWeekType = weekSchedule.find((object) => object.monday_date === monthDayYear(mondayDate));
          if (boxWeekType === undefined) {
            boxWeekType = {schedule: 'vacation_week'}
          }
          const boxWeekSchedule = weekTypes.find((object) => object.name === boxWeekType.schedule);
          boxDayType = boxWeekSchedule.schedule[i+1];
        } else {
          boxDayType = boxDayType.schedule;
        };
        const boxDaySchedule = dayTypes.find((object) => object.name === boxDayType);
        // set box style based on previously retrieved type date
        calendarBox.style.backgroundColor = boxDaySchedule.color;
        calendarBox.style.color = boxDaySchedule.text_color;
        if (boxDaySchedule.tag === '') {
          calendarBox.textContent = boxDate.getDate();
        } else {
          calendarBox.textContent = boxDaySchedule.tag;
        };
        calendarBox.setAttribute('title',boxDaySchedule.display_name)
      });

      // mark current day calendar box
      if (new Date(currentDate).getDay() > 0 && new Date(currentDate).getDay() < 6) {
        calendarBoxes[currentDate.getDay()-1].style.border = '5px double ' + calendarBoxes[currentDate.getDay()-1].style.color;
        calendarBoxes[currentDate.getDay()-1].style.padding = '13px';
      };

      // set dayTypeBox
      if (normalDayName) {
        dayTypeBox.textContent = currentDaySchedule.display_name;
      }

      // reload and web notification settings
      let notifMinBefore = 5
      let currentReload = false
      let currentNotif = false

      // create function to update the current boxes
      function updateCurrent() {
        // store current time peices
        currentDate = new Date(new Date(new Date().setSeconds(new Date().getSeconds()-timeOffset)).setDate(new Date().getDate()));
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();
        let currentTime;
        let testHours
        let testMinutes
        let testTime;
        let hoursUntil
        let minutesUntil
        let secondsUntil = 60-currentSeconds
        let timeUntil = Infinity;
        let periodIndex
        let periodHours
        let periodMinutes
        let className

        // find current period
        currentDaySchedule.schedule.forEach((item, i) => {
          currentTime = currentHours * 60 + currentMinutes + currentSeconds / 60;
          testHours = parseFloat(item.time.slice(0, -3));
          testMinutes = parseFloat(item.time.slice(-2));
          testTime = testHours * 60 + testMinutes;
          if (testTime-currentTime > 0 && testTime-currentTime < timeUntil) {
            periodIndex = i;
            timeUntil = testTime-currentTime;
            hoursUntil = testHours - currentHours;
            minutesUntil = testMinutes - currentMinutes;
          };
        });

        // store current period information
        if (periodIndex === undefined) { // if no school day /  after school
          let nextDate = new Date(new Date(currentDate).setDate(currentDate.getDate()+1));
          let nextMondayDate
          let nextDayType
          let nextWeekType
          let nextWeekSchedule
          let nextDaySchedule
          let extraDays = 1
          while (extraDays <= 365) {
            nextMondayDate = new Date(new Date(nextDate).setDate(nextDate.getDate()-nextDate.getDay()+1));
            nextDayType = daySchedule.find((object) => object.date === monthDayYear(nextDate));
            nextWeekType = weekSchedule.find((object) => object.monday_date === monthDayYear(nextMondayDate));
            if (nextWeekType === undefined) {
              nextWeekType = {schedule: 'vacation_week'}
            }
            nextWeekSchedule = weekTypes.find((object) => object.name === nextWeekType.schedule);

            if (nextDayType === undefined) {
              nextDayType = nextWeekSchedule.schedule[nextDate.getDay()];
            } else {
              nextDayType = nextDayType.schedule;
            };
            nextDaySchedule = dayTypes.find((object) => object.name === nextDayType);
            if (nextDaySchedule.schedule.length === 0) {
              nextDate.setDate(nextDate.getDate()+1);
              extraDays++
            } else {
              break;
            };
          };
          if (extraDays>365) {
            document.getElementById('end-time-box').innerHTML = 'Summer!!!'
          }
          periodHours = nextDaySchedule.schedule[0].time.slice(0, -3);
          periodMinutes = nextDaySchedule.schedule[0].time.slice(-2)
          className = nextDaySchedule.schedule.slice(-1)[0].name;
          hoursUntil = parseFloat(periodHours) - currentHours + 24 * extraDays;
          minutesUntil = parseFloat(periodMinutes) - currentMinutes;
        } else if (periodIndex === 0) { // if before school
          periodHours = currentDaySchedule.schedule[periodIndex].time.slice(0, -3);
          periodMinutes = currentDaySchedule.schedule[periodIndex].time.slice(-2);

          let previousDate = new Date(new Date(currentDate).setDate(currentDate.getDate()-1));
          let previousMondayDate
          let previousDayType
          let previousWeekType
          let previousWeekSchedule
          let previousDaySchedule
          while (true) {
            previousMondayDate = new Date(new Date(previousDate).setDate(previousDate.getDate()-previousDate.getDay()+1));
            previousDayType = daySchedule.find((object) => object.date === monthDayYear(previousDate));
            previousWeekType = weekSchedule.find((object) => object.monday_date === monthDayYear(previousMondayDate));
            previousWeekSchedule = weekTypes.find((object) => object.name === previousWeekType.schedule);
            if (previousDayType === undefined) {
              previousDayType = previousWeekSchedule.schedule[previousDate.getDay()];
            } else {
              previousDayType = previousDayType.schedule;
            };
            previousDaySchedule = dayTypes.find((object) => object.name === previousDayType);
            if (previousDaySchedule.schedule.length === 0) {
              previousDate.setDate(previousDate.getDate()-1);
            } else {
              break;
            };
          };
          className = previousDaySchedule.schedule.slice(-1)[0].name;

        } else { // if during school
          periodHours = currentDaySchedule.schedule[periodIndex].time.slice(0, -3);
          periodMinutes = currentDaySchedule.schedule[periodIndex].time.slice(-2);
          className = currentDaySchedule.schedule[periodIndex-1].name;
        };

        // fix time until variables to remove negatimes
        if (secondsUntil == 60) {
          secondsUntil = 0
        } else {
          minutesUntil -= 1
        }
        if (minutesUntil < 0) {
          hoursUntil -= 1
          minutesUntil += 60
        }

        // set current boxes based on previously stored information

        if (nameableClasses.includes(className)) {

          try {
            chrome.storage.sync.get(['classNames'], (res) => {
              classNamesPopup(res)
            })
          } catch (e) {
            classNamesPopup({classNames: JSON.parse(localStorage.getItem('classNames'))})
          }

          function classNamesPopup(res) {
            classBox.textContent = res.classNames.find((object) => object.class === className).name
          }

        } else {
          classBox.textContent = className;
        }

        // Relod and Web Notif triggers
        let secondsTimeUntil = secondsUntil+60*(minutesUntil+60*hoursUntil)
        let currentTimeInSeconds = currentDate.getSeconds()+60*(currentDate.getMinutes()+60*currentDate.getHours())
        if (secondsTimeUntil === 1 && !currentReload || currentTimeInSeconds === 0) {
          currentReload = true
          setTimeout(function () {
            location.reload()
          }, 1e3);
        } else if (secondsTimeUntil >= 1 && currentReload) {
          currentReload = false
        }


          console.log('tryTestSend');
          if (!(window.chrome && chrome.runtime && chrome.runtime.id)) {
            console.log('testSend');
            if (JSON.parse(localStorage.getItem('periodNotify')) !== false && secondsTimeUntil <= notifMinBefore*60 && !currentNotif) {
              currentNotif = true
              notify('Only 5 Minutes Left')
              console.log('notifTrySend');
            } else if (secondsTimeUntil > notifMinBefore*60 && currentNotif) {
              currentNotif = false
            }
          }

        timeBox.textContent = String(hoursUntil).padStart(2,'0')+':'+String(minutesUntil).padStart(2,'0')+':'+String(secondsUntil).padStart(2,'0')
        if (periodHours > 12) {
          endTimeBox.textContent = 'Ends '+(parseFloat(periodHours)-12)+':'+periodMinutes+' PM';
        } else if (periodHours === 12) {
          endTimeBox.textContent = 'Ends '+periodHours+':'+periodMinutes+' PM';
        } else {
          endTimeBox.textContent = 'Ends '+periodHours+':'+periodMinutes+' AM';
        };
      };
      updateCurrent(); // call function for initial update
      setInterval(updateCurrent, 100) // call function at every interval
    });

  })

}
