// load time offset settings
// let timeOffset = 0
chrome.storage.sync.get(['bellOffsetSetting'], (res) => {
  config_file.then((presetBellOffset) => {
    // set timeOffset
    if (res.bellOffsetSetting === 'preset') {
      timeOffset = presetBellOffset.bell_offset
    } else {
      timeOffset = res.bellOffsetSetting
    }

    // store dates
    let currentDate = new Date(new Date(new Date().setSeconds(new Date().getSeconds()-timeOffset)).setDate(new Date().getDate()+dayOffset));
    const mondayDate = new Date(new Date(currentDate).setDate(currentDate.getDate()-currentDate.getDay()+1));

    // store elements
    const menuButton = document.getElementById('menu-button')
    const chevronGroup = document.getElementById('chevron-group')
    const body = document.getElementsByTagName('body')[0]
    const flipDiv = document.getElementById('flip-div')

    menuButton.addEventListener('click', () => {
      body.classList.toggle('full-width-body')
      flipDiv.classList.toggle('flip-button')
    })

    // create function to convert date object to mm/dd/yy form
    function monthDayYear(date) {
      return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    };

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

        chrome.storage.sync.get(['classNames'], (res) => {
          classNames = res.classNames
          let currentClass = classNames.find((object) => object.class === item.name);
          if (currentClass === undefined || currentClass.name === item.name) {
            scheduleName.appendChild(document.createTextNode(item.name))
          } else {
            scheduleName.appendChild(document.createTextNode(item.name+' : '+currentClass.name))
          }
        })


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
        menuButton.setAttribute('disabled', true)
      }
    })
  })
})
