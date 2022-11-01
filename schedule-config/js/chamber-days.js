config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));

  // store elements
  const addDateButton = document.getElementById('add-date-button')
  const addDate = document.getElementById('add-date')
  const dateList = document.getElementById('date-list')

  // display current Settings
  displayDays()

  function displayDays() {
    while (dateList.firstChild) {
        dateList.removeChild(dateList.firstChild);
    }
    config.chamber_days.forEach((item, i) => {
      addItem(new Date(item), 'date-item-'+i)
    });
  }

  function addItem(date, id) {
    let dateString = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()] + ', '
    dateString += ['January','Febuary','March','April','May','June','July','August','September','October','November','December'][date.getMonth()] + ' '
    dateString += ordinal_suffix_of(date.getDate()) + ', ' + date.getFullYear()

    let dateItem = document.createElement('div')
    dateItem.classList.add('date-item')
    dateItem.setAttribute('id', id)

    let dateDate = document.createElement('div')
    dateDate.classList.add('date-date')
    dateDate.appendChild(document.createTextNode(dateString))

    let dateRemoveButton = document.createElement('button')
    dateRemoveButton.setAttribute('type','button')
    dateRemoveButton.classList.add('date-remove-button')
    dateRemoveButton.addEventListener('click', () => {
      // dateList.removeChild(document.getElementById(id))
      config.chamber_days.splice(id.split('-').slice(-1)[0],1)
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayDays()
    })

    let dateRemove = document.createElement('i')
    dateRemove.classList.add('fa-solid', 'fa-xmark', 'date-remove')

    dateItem.appendChild(dateDate)
    dateRemoveButton.appendChild(dateRemove)
    dateItem.appendChild(dateRemoveButton)

    dateList.appendChild(dateItem)
  }

  // add date function
  addDateButton.addEventListener('click', () => {
    let newDate = new Date(addDate.valueAsNumber)
    newDate = new Date(newDate.setDate(newDate.getDate() + 1))
    if (!isNaN(newDate)) {
      addDate.value = ''
      config.chamber_days.push(monthDayYear(newDate))
      config.chamber_days.sort((a,b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      })
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayDays()
    }
  })
})
