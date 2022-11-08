const jazzChamberScheduleFile = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/jazzChamberSchedules.json?nocache='+(Math.random()+'').replace('.','')) .then(res => res.json());
chrome.storage.sync.get(['showJazz', 'showChamber'], (res) => {
  jazzChamberScheduleFile.then((jazzChamberSchedule) => {
    const calendarBoxes = Array.from(document.getElementsByClassName('calendar-box'));

    let currentDate = new Date(new Date(new Date().setSeconds(new Date().getSeconds()-timeOffset)).setDate(new Date().getDate()+dayOffset));
    const mondayDate = new Date(new Date(currentDate).setDate(currentDate.getDate()-currentDate.getDay()+1));

    function monthDayYear(date) {
      return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    };


    let i = 0
    while (i<5) {
      let date = monthDayYear(new Date(new Date(mondayDate).setDate(mondayDate.getDate()+i)))

      if (res.showChamber && jazzChamberSchedule.chamber_days.includes(date)) {
        calendarBoxes[i].classList.add('chamber-day')
      }

      if (res.showJazz && jazzChamberSchedule.jazz_days.includes(date)) {
        calendarBoxes[i].classList.add('jazz-day')
      }

      i++
    }
  })
})
