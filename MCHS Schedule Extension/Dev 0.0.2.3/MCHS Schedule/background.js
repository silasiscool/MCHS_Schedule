const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/schedules.json').then(res => res.json());

chrome.action.setBadgeBackgroundColor({color: '#E9C552'})

// chrome.action.setBadgeText({text: '5min!'})
// chrome.action.setBadgeText({text: ''})

let currentDate = new Date(new Date().setSeconds(new Date().getSeconds()));
const mondayDate = new Date(new Date().setDate(currentDate.getDate()-currentDate.getDay()+1));

function monthDayYear(date) {
  return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
};

function fiveMinAlert() {
  let repsLeft = 5
  let repeater = setInterval(() => {
    if (!Boolean(repsLeft)) {
      clearInterval(repeater)
    } else if (repsLeft % 2 !== 0) {
      chrome.action.setBadgeText({text: '5min!'})
    } else {
      chrome.action.setBadgeText({text: ''})
    }
    repsLeft -= 1
  }, 100)
}



config_file.then((config) => {
  const daySchedule = config.day_schedule;
  const dayTypes = config.day_types;
  const weekSchedule = config.week_schedule;
  const weekTypes = config.week_types;
  const nameableClasses = config.nameable_classes;

  let currentDayType = daySchedule.find((object) => object.date === monthDayYear(currentDate));
  const currentWeekType = weekSchedule.find((object) => object.monday_date === monthDayYear(mondayDate));
  const currentWeekSchedule = weekTypes.find((object) => object.name === currentWeekType.schedule);
  if (currentDayType === undefined) {
    currentDayType = currentWeekSchedule.schedule[currentDate.getDay()];
  } else {
    currentDayType = currentDayType.schedule;
  };
  const currentDaySchedule = dayTypes.find((object) => object.name === currentDayType);

  setInterval(() => {
    currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    let currentTime;
    let testHours
    let testMinutes
    let testTime;
    let minutesUntil
    let timeUntil = Infinity;
    let periodIndex

    currentDaySchedule.schedule.forEach((item, i) => {
      currentTime = currentHours * 60 + currentMinutes + currentSeconds / 60;
      testHours = parseFloat(item.time.slice(0, -3));
      testMinutes = parseFloat(item.time.slice(-2));
      testTime = testHours * 60 + testMinutes;
      if (testTime-currentTime > 0 && testTime-currentTime < timeUntil) {
        periodIndex = i;
        timeUntil = testTime-currentTime;
        minutesUntil = (testMinutes - currentMinutes) + (60 * (testHours - currentHours))
      };
    });


    if (currentDate.getSeconds()===0 && minutesUntil===5) {
      let repsLeft = 5
      let repeater = setInterval(() => {
        if (!Boolean(repsLeft)) {
          clearInterval(repeater)
        } else if (repsLeft % 2 !== 0) {
          chrome.action.setBadgeText({text: '5min!'})
        } else {
          chrome.action.setBadgeText({text: ''})
        }
        repsLeft -= 1
      }, 100)
    } else if (minutesUntil <= 5) {
      chrome.action.setBadgeText({text: '5min!'})
    } else {
      chrome.action.setBadgeText({text: ''})
    }
  }, 1000)
})
