config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));

  // store elements
  let addDateDate = document.getElementById('add-date-date')
  let typeSelect = document.getElementById('type-select')
  let addDateButton = document.getElementById('add-date-button')
  let itemList = document.getElementById('item-list')
  let altName = document.getElementById('alt-name')

  // Set type select dropdown options
  config.day_types.forEach((item, i) => {
    let option = document.createElement('option')
    option.setAttribute('value', item.name)
    option.appendChild(document.createTextNode(item.name))

    typeSelect.appendChild(option)
  });

  addDateButton.addEventListener('click', () => {
    let newDate = new Date(addDateDate.valueAsNumber)
    newDate = monthDayYear(new Date(newDate.setDate(newDate.getDate() + 1)))
    if (addDateDate.value !== '' && typeSelect.value !== '' && config.day_schedule.findIndex((object) => object.date === newDate)===-1) {
      let newItem = {date: newDate, schedule: typeSelect.value}
      if (altName.value !== config.day_types.find((object) => object.name === typeSelect.value).display_name) {
        newItem.alt_name = altName.value
      }
      config.day_schedule.push(newItem)
      config.day_schedule.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayDays()

      addDateDate.value = ''
      typeSelect.value = ''
      altName.value = ''
    } else if (addDateDate.value !== '' && typeSelect.value !== '') {
      window.alert('Date already assigned custom type')
    } else {
      window.alert('All fields not filled')
    }
  })

  typeSelect.addEventListener('change', () => {
    altName.value = config.day_types.find((object) => object.name === typeSelect.value).display_name
  })

  displayDays()

  function displayDays() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    config.day_schedule.forEach((item, i) => {
      addItem(item, i)
    });
  }

  function addItem(item, i) {
    let date = new Date(item.date)
    let dateString = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()] + ', '
    dateString += ['January','Febuary','March','April','May','June','July','August','September','October','November','December'][date.getMonth()] + ' '
    dateString += ordinal_suffix_of(date.getDate()) + ', ' + date.getFullYear()
    let altName = ''
    if (item.alt_name !== undefined) {
      altName = ' : ' + item.alt_name;
    }

    let itemItem = document.createElement('div')
    itemItem.classList.add('item-item')

    let itemName = document.createElement('div')
    itemName.classList.add('item-name')
    itemName.appendChild(document.createTextNode(dateString+' : '+item.schedule+altName))

    let itemRemoveButton = document.createElement('button')
    itemRemoveButton.setAttribute('type','button')
    itemRemoveButton.classList.add('item-remove-button')
    itemRemoveButton.addEventListener('click', () => {
      config.day_schedule.splice(i,1)
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayDays()
    })

    let itemRemove = document.createElement('i')
    itemRemove.classList.add('fa-solid', 'fa-trash', 'item-remove')

    itemItem.appendChild(itemName)
    itemRemoveButton.appendChild(itemRemove)
    itemItem.appendChild(itemRemoveButton)

    itemList.appendChild(itemItem)
  }

})
