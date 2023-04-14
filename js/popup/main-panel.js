// everything
function updateMainPanel() {
  updateCalendarSection()
  updateInfoPanelSection()
}

// calendar section
let calendarPanelSection = document.getElementById('calendar-panel-section');
let calendarWrapper = document.getElementById('calendar-wrapper');
let prevWeekScrollButton = document.getElementById('prev-week-scroll-button');
let nextWeekScrollButton = document.getElementById('next-week-scroll-button')

function updateCalendarSection() {
  Array.from(calendarWrapper.children).forEach((item, i) => {
    let tempBoxDate = mondayDate(addCalendarOffset(adjustedTime()));
    tempBoxDate.setDate(tempBoxDate.getDate()+i);
    tempBoxInfo = dayInfo(dayType(tempBoxDate));
    if (!tempBoxInfo) {
      return
    }
    if (i == adjustedTime().getDay()-1 && calendarOffsetWeeks == 0) {
      item.classList.add('current-day');
    } else {
      item.classList.remove('current-day');
    }
    item.style.backgroundColor = tempBoxInfo.color;
    item.style.setProperty('--calendar-box-text-color', tempBoxInfo.text_color);
    item.textContent = tempBoxDate.getDate()
    item.title = tempBoxInfo.display_name;
    if (tempBoxInfo.tag) {
      item.textContent = tempBoxInfo.tag;
    }

    if (i == 0) {
      prevWeekScrollButton.getElementsByTagName('svg')[0].style.fill = tempBoxInfo.text_color;
    } else if (i == calendarWrapper.children.length - 1) {
      nextWeekScrollButton.getElementsByTagName('svg')[0].style.fill = tempBoxInfo.text_color;
    }

    if (showJazz && isJazzDay(tempBoxDate)) {
      item.classList.add('is-jazz-day');
    }
    if (showChamber && isChamberDay(tempBoxDate)) {
      item.classList.add('is-chamber-day')
    }
  });


}

// info panel section
let dayTypeSectionLine = document.getElementById('day-type');
let periodNameSectionLine = document.getElementById('period-name');
let countdown = document.getElementById('countdown');
let countdownWeeks = document.getElementById('weeks-number');
let countdownDays = document.getElementById('days-number');
let countdownHours = document.getElementById('hours-number');
let countdownMinutes = document.getElementById('minutes-number');
let countdownSeconds = document.getElementById('seconds-number');
let countdownMilliseconds = document.getElementById('milliseconds-number');
let endTimeSectionLine = document.getElementById('end-time');


function updateInfoPanelSection() {
  updateDayTypeLine()
  updateCurrentAndCountdown()
  updateCurrentClass()
}

function updateDayTypeLine() {
  tempCurrentDayInfo = dayInfo(dayType(adjustedTime()));
  if (!tempCurrentDayInfo) {
    return
  }
  dayTypeSectionLine.textContent = tempCurrentDayInfo.display_name;
}

function updateCurrentAndCountdown() {
  if (showMilliseconds) {
    countdown.classList.add('show-milliseconds');
  } else {
    countdown.classList.remove('show-milliseconds');
  }

  let tempEndTime = nextPeriod(adjustedTime())?.dateObject
  if (!tempEndTime) return;
  if(monthDayYear(tempEndTime) == monthDayYear(adjustedTime())) {
    endTimeSectionLine.textContent = `Ends ${hourMinute12(tempEndTime, true)}`
  } else if (monthDayYear(tempEndTime) == monthDayYear(new Date(adjustedTime().setDate(adjustedTime().getDate()+1)))) {
    endTimeSectionLine.textContent = `Ends ${hourMinute12(tempEndTime, true)} Tomorrow`
  } else {
    endTimeSectionLine.textContent = `Ends ${hourMinute12(tempEndTime, true)} on ${monthDayYear(tempEndTime, true)}`
  }
  let tempDuration = tempEndTime - adjustedTime();
  let tempMilliseconds = Math.floor(tempDuration % 1000 /10);
  let tempSeconds = Math.floor(tempDuration % (60 * 1000) / 1000);
  let tempMinutes = Math.floor(tempDuration % (60 * 60 * 1000) / (60 * 1000));
  let tempHours = Math.floor(tempDuration % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  let tempDays = Math.floor(tempDuration % (7 * 24 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000));
  let tempWeeks = Math.floor(tempDuration % (1) / (1));

  countdownMilliseconds.textContent = (tempMilliseconds.toString().padStart(2, '0')).replace(/0/g, "O");
  countdownSeconds.textContent = (tempSeconds.toString().padStart(2, '0')).replace(/0/g, "O");
  countdownMinutes.textContent = (tempMinutes.toString().padStart(2, '0')).replace(/0/g, "O");
  countdownHours.textContent = (tempHours.toString().padStart(2, '0')).replace(/0/g, "O");
  countdownDays.textContent = (tempDays.toString().padStart(2, '0')).replace(/0/g, "O");
  countdownWeeks.textContent = (tempWeeks.toString().padStart(2, '0')).replace(/0/g, "O");
  countdownMilliseconds.dataset.time = tempMilliseconds;
  countdownSeconds.dataset.time = tempSeconds;
  countdownMinutes.dataset.time = tempMinutes;
  countdownHours.dataset.time = tempHours;
  countdownDays.dataset.time = tempDays;
  countdownWeeks.dataset.time = tempWeeks;
}

function updateCurrentClass() {

  let tempNextClass = prevPeriod(adjustedTime())
  let tempCustomName = getCustomClassName(tempNextClass?.name)
  periodNameSectionLine.textContent = tempCustomName;
}

prevWeekScrollButton.addEventListener('click', () => calendarOffsetWeeks -= 1)

nextWeekScrollButton.addEventListener('click', () => calendarOffsetWeeks += 1)
