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
dayBoxes[new Date().getDay()-1].style.border = '5px double' + dayBoxes[new Date().getDay()-1].style.color
dayBoxes[new Date().getDay()-1].style.padding = '13px'

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
config_file.then(function (config) {
  let currentDayType = config.day_types.forEach((item) => {
    if (item.display_name == dayTypeBox.innerHTML) {
      return item.name
    }
  });
  console.log(currentDayType)


  console.log(config)
  setInterval(() => {

  }, 1000)
})

// set Today's Date
let dateBox = document.getElementById('date-box');
dateBox.innerHTML = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]+', '+(new Date().getMonth()+1)+'/'+new Date().getDate()+'/'+new Date().getFullYear();
