// store elements
const menuButton = document.getElementById('menu-button')
const chevronGroup = document.getElementById('chevron-group')
const body = document.getElementsByTagName('body')[0]
const flipDiv = document.getElementById('flip-div')

menuButton.addEventListener('click', () => {
  body.classList.toggle('full-width-body')
  flipDiv.classList.toggle('flip-button')
})


// set all fields related to config_file contents
config_file.then((config) => {
  // store parts of config_file
  const daySchedule = config.day_schedule;
  const dayTypes = config.day_types;
  const weekSchedule = config.week_schedule;
  const weekTypes = config.week_types;
  const nameableClasses = config.nameable_classes;

  // store current information
  let currentDayType = daySchedule.find((object) => object.date === monthDayYear(currentDate));
  const currentWeekType = weekSchedule.find((object) => object.monday_date === monthDayYear(mondayDate));
  const currentWeekSchedule = weekTypes.find((object) => object.name === currentWeekType.schedule);
  if (currentDayType === undefined) {
    currentDayType = currentWeekSchedule.schedule[currentDate.getDay()];
  } else {
    currentDayType = currentDayType.schedule;
  };
  const currentDaySchedule = dayTypes.find((object) => object.name === currentDayType);

  let scheduleBox = document.getElementById('schedule-popup')
  let scheduleLength = 0
  currentDaySchedule.schedule.forEach((item, i) => {

    let scheduleItem = document.createElement('div')
    scheduleItem.classList.add('schedule-item')
    let scheduleTime = document.createElement('div')
    scheduleTime.classList.add('schedule-time')
    if (item.time.slice(0,-3)>12) {
      scheduleTime.appendChild(document.createTextNode(parseFloat(item.time.slice(0,-3))-12+item.time.slice(-3)))
    } else {
      scheduleTime.appendChild(document.createTextNode(item.time))
    }
    let scheduleName = document.createElement('div')
    scheduleName.classList.add('schedule-name')
    scheduleName.appendChild(document.createTextNode(item.name))
    if (parseFloat(item.time.slice(0,-3))*60+parseFloat(item.time.slice(-2)) <= currentDate.getHours()*60+currentDate.getMinutes()) {
      scheduleItem.style.display = 'none'
    } else {
      scheduleLength ++
    }

    scheduleItem.appendChild(scheduleTime)
    scheduleItem.appendChild(scheduleName)

    scheduleBox.appendChild(scheduleItem)
  });
  if (scheduleLength === 0) {
    document.getElementById('menu-button').setAttribute('disabled', true)
  }
})
