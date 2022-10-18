// fetch files
let config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/schedules.json').then(res => res.json());

// set calendar and daily type boxes
let mondayFullDate = new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+1))
let mondayBox = document.getElementById('monday-box');
let tuesdayBox = document.getElementById('tuesday-box');
let wednesdayBox = document.getElementById('wednesday-box');
let thursdayBox = document.getElementById('thursday-box');
let fridayBox = document.getElementById('friday-box');

let dayBoxes = [mondayBox, tuesdayBox, wednesdayBox, thursdayBox, fridayBox]

dayBoxes.forEach((item, i) => {
  item.innerHTML = new Date(new Date(mondayFullDate).setDate(new Date().getDate()-new Date().getDay()+1+i)).getDate()
});

if (new Date().getDay() > 0 && new Date().getDay() < 6) {
  dayBoxes[new Date().getDay()-1].style.border = '5px double' + dayBoxes[new Date().getDay()-1].style.color
  dayBoxes[new Date().getDay()-1].style.padding = '13px'
}


let dayTypeBox = document.getElementById('day-type-box')

config_file.then((config) => {
  config.week_schedule.forEach((itemWeekSchedule) => {
    if (itemWeekSchedule.monday_date == (mondayFullDate.getMonth()+1)+'/'+mondayFullDate.getDate()+'/'+mondayFullDate.getFullYear()) {
      config.week_types.forEach((itemWeekTypes) => {
        if (itemWeekTypes.name == itemWeekSchedule.schedule) {
          config.day_types.forEach((itemDayTypes) => {
            if (itemDayTypes.name == itemWeekTypes.schedule[new Date().getDay()]) {
              dayTypeBox.innerHTML = itemDayTypes.display_name
            }
          });
          dayBoxes.forEach((itemDayBox, iDayBox) => {
            config.day_types.forEach((itemDayTypes) => {
              if (itemDayTypes.name == itemWeekTypes.schedule[iDayBox+1]) {
                itemDayBox.style.backgroundColor = itemDayTypes.color
                itemDayBox.style.color = itemDayTypes.text_color
                if (itemDayTypes.tag != "") {
                  itemDayBox.innerHTML = itemDayTypes.tag
                }
              }
            });
            config.day_schedule.forEach((itemDaySchedule) => {
              let boxDate = new Date(new Date(mondayFullDate).setDate(new Date().getDate()-new Date().getDay()+1+iDayBox))
              if (itemDaySchedule.date == (boxDate.getMonth()+1)+'/'+boxDate.getDate()+'/'+boxDate.getFullYear()) {
                config.day_types.forEach((itemDayTypes) => {
                  if (itemDayTypes.name == itemDaySchedule.schedule) {
                    itemDayBox.style.backgroundColor = itemDayTypes.color
                    itemDayBox.style.color = itemDayTypes.text_color
                    if (itemDayTypes.tag != "") {
                      itemDayBox.innerHTML = itemDayTypes.tag
                    }
                  }
                })
              }
            });
          });
        }
      });
    }
  });
  config.day_schedule.forEach((itemDaySchedule) => {
    if (itemDaySchedule.date == (new Date().getMonth()+1)+'/'+new Date().getDate()+'/'+new Date().getFullYear()) {
      config.day_types.forEach((itemDayType) => {
        if (itemDayType.name == itemDaySchedule.schedule) {
          dayTypeBox.innerHTML = itemDayType.display_name
        }
      });
    }
  });
})

// set current box
let classBox = document.getElementById('class-box')
let timeBox = document.getElementById('time-box')
let endTimeBox = document.getElementById('end-time-box')
function updateTime() {
  mondayFullDate = new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+1))
  config_file.then((config) => {
    config.day_types.forEach((item) => {
      if (item.display_name == dayTypeBox.innerHTML) {
        let currentHours = new Date().getHours()
        let currentMinutes = new Date().getMinutes()
        let currentSeconds = new Date().getSeconds()
        let hoursUntil
        let minutesUntil
        let secondsUntil = 60-currentSeconds
        let timeUntil = Infinity
        let periodIndex
        let periodHours
        let periodMinutes
        item.schedule.forEach((item, i) => {
          let setHours = parseFloat(item.time.slice(0,-3))
          let setMinutes = parseFloat(item.time.slice(-2))
          currentTime = currentMinutes + currentHours * 60 + currentSeconds / 60
          setTime = setMinutes + setHours * 60
          if (setTime-currentTime > 0 && setTime-currentTime < timeUntil) {
            periodIndex = i
            timeUntil = setTime-currentTime
            hoursUntil = setHours - currentHours
            minutesUntil = setMinutes - currentMinutes
          }

        });
        if (periodIndex == undefined) {
          let dayOffset = 1
          let currentDay = new Date().getDay()
          let nextDate = new Date(new Date().setDate(new Date().getDate()+1))
          while (true) {
            if (currentDay === 6) {mondayFullDate = new Date(mondayFullDate.setDate(mondayFullDate.getDate()+7))}
              let weekType = config.week_schedule.find(object => {return object.monday_date === (mondayFullDate.getMonth()+1)+'/'+mondayFullDate.getDate()+'/'+mondayFullDate.getFullYear()}).schedule
            let weekSchedule = config.week_types.find(object => {return object.name === weekType}).schedule
            let dayType = config.day_schedule.find(object => {return object.date === (nextDate.getMonth()+1)+'/'+nextDate.getDate()+'/'+nextDate.getFullYear()})
            if (dayType == undefined) {dayType = weekSchedule[nextDate.getDay()]} else {dayType = dayType.schedule}
            let daySchedule = config.day_types.find(object => {return object.name === dayType})
            if (daySchedule.schedule.length===0) {
              currentDay = new Date(new Date().setDate(new Date().getDate()+dayOffset)).getDay()
              nextDate = new Date(new Date().setDate(new Date().getDate()+1+dayOffset))
              dayOffset += 1
              continue
            } else {
              periodHours = daySchedule.schedule[0].time.slice(0,-3)
              periodMinutes = daySchedule.schedule[0].time.slice(-2)
              let setHours = parseFloat(periodHours)+(24*dayOffset)
              let setMinutes = parseFloat(periodMinutes)
              hoursUntil = setHours - currentHours
              minutesUntil = setMinutes - currentMinutes

              mondayFullDate = new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+1))
              currentDay = new Date().getDay()
              let previousDate = new Date(new Date().setDate(new Date().getDate()-1))
              while (true) {
                if (currentDay === 0) {mondayFullDate = new Date(mondayFullDate.setDate(mondayFullDate.getDate()-7))}
                let weekType = config.week_schedule.find(object => {return object.monday_date === (mondayFullDate.getMonth()+1)+'/'+mondayFullDate.getDate()+'/'+mondayFullDate.getFullYear()}).schedule
                let weekSchedule = config.week_types.find(object => {return object.name === weekType}).schedule
                let dayType = config.day_schedule.find(object => {return object.date === (previousDate.getMonth()+1)+'/'+previousDate.getDate()+'/'+previousDate.getFullYear()})
                if (dayType == undefined) {dayType = weekSchedule[previousDate.getDay()]} else {dayType = dayType.schedule}
                let daySchedule = config.day_types.find(object => {return object.name === dayType})
                if (daySchedule.schedule.length === 0) {
                  previousDate = new Date(new Date().setDate(previousDate.getDate()-1))
                  currentDay = new Date(previousDate.getDay())
                  continue
                } else {
                  classBox.innerHTML = daySchedule.schedule.slice(-1)[0].name
                  break
                }
              }
              break
            }
          }
        } else if (periodIndex == 0){
          periodHours = item.schedule[periodIndex].time.slice(0,-3)
          periodMinutes = item.schedule[periodIndex].time.slice(-2)
          config.week_schedule.forEach((itemWeekSchedule) => {
            if (itemWeekSchedule.monday_date == (mondayFullDate.getMonth()+1)+'/'+mondayFullDate.getDate()+'/'+mondayFullDate.getFullYear()) {
              config.week_types.forEach((itemWeekTypes) => {
                if (itemWeekTypes.name == itemWeekSchedule.schedule) {
                  config.day_types.forEach((itemDayTypes) => {
                    if (itemDayTypes.name == itemWeekTypes.schedule[new Date(new Date().setDate(new Date().getDate()-1)).getDay()]) {
                      mondayFullDate = new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+1))
                      currentDay = new Date().getDay()
                      let previousDate = new Date(new Date().setDate(new Date().getDate()-1))
                      while (true) {
                        if (currentDay === 0) {mondayFullDate = new Date(mondayFullDate.setDate(mondayFullDate.getDate()-7))}
                        let weekType = config.week_schedule.find(object => {return object.monday_date === (mondayFullDate.getMonth()+1)+'/'+mondayFullDate.getDate()+'/'+mondayFullDate.getFullYear()}).schedule
                        let weekSchedule = config.week_types.find(object => {return object.name === weekType}).schedule
                        let dayType = config.day_schedule.find(object => {return object.date === (previousDate.getMonth()+1)+'/'+previousDate.getDate()+'/'+previousDate.getFullYear()})
                        if (dayType == undefined) {dayType = weekSchedule[previousDate.getDay()]} else {dayType = dayType.schedule}
                        let daySchedule = config.day_types.find(object => {return object.name === dayType})
                        if (daySchedule.schedule.length === 0) {
                          previousDate = new Date(new Date().setDate(previousDate.getDate()-1))
                          currentDay = new Date(previousDate.getDay())
                          continue
                        } else {
                          classBox.innerHTML = daySchedule.schedule.slice(-1)[0].name
                          break
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        } else {
          periodHours = item.schedule[periodIndex].time.slice(0,-3)
          periodMinutes = item.schedule[periodIndex].time.slice(-2)
          classBox.innerHTML = item.schedule[periodIndex-1].name
        }
        if (secondsUntil == 60) {
          secondsUntil = 0
        } else {
          minutesUntil -= 1
        }
        if (minutesUntil < 0) {
          hoursUntil -= 1
          minutesUntil += 60
        }


        timeBox.innerHTML = String(hoursUntil).padStart(2,'0')+':'+String(minutesUntil).padStart(2,'0')+':'+String(secondsUntil).padStart(2,'0')

        if (periodHours > 12) {
          endTimeBox.innerHTML = 'Ends '+(parseFloat(periodHours)-12)+':'+periodMinutes+' PM'
        } else {
          endTimeBox.innerHTML = 'Ends '+periodHours+':'+periodMinutes+' AM'
        }

      }
    });
  })
}
updateTime()
setInterval(updateTime, 100)


// set Today's Date
let dateBox = document.getElementById('date-box');
dateBox.innerHTML = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]+', '+(new Date().getMonth()+1)+'/'+new Date().getDate()+'/'+new Date().getFullYear();
