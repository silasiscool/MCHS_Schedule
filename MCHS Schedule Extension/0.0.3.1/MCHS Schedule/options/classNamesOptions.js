// fetch config file
const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/schedules.json').then(res => res.json());

// store elements
const classNamesBox = document.getElementById('class-names-box');

chrome.storage.sync.get(['classNames'], (res) => {
  config_file.then((config) => {
    const nameableClasses = config.nameable_classes;
    let classNameInputs = []
    nameableClasses.forEach((item, i) => {
      let inputGroup = document.createElement('div');
      inputGroup.setAttribute('class', 'inputGroup');
      let input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', item)
      input.setAttribute('class', 'settings')
      let name = res.classNames.find((object) => object.class === item)
      if (name === undefined) {
        name = item
        chrome.storage.sync.set({classNames: res.classNames.push({class: item, name: item})})
      } else {
        name = name.name
      }
      input.setAttribute('value', res.classNames.find((object) => object.class === item).name)
      input.addEventListener('change',saveValues)

      let label = document.createElement('label');
      label.setAttribute('for', item)
      label.appendChild(document.createTextNode(item+': '))

      inputGroup.appendChild(label)
      inputGroup.appendChild(input)
      // inputGroup.appendChild(document.createElement('br'))
      classNamesBox.appendChild(inputGroup)
    });
  })
});

function saveValues() {
  let inputs = Array.from(document.getElementsByClassName('settings'))
  let newSettings = []
  inputs.forEach((item, i) => {
    newSettings.push({class: item.name, name: item.value});
  });

  chrome.storage.sync.set({classNames: newSettings})
}

document.getElementById('submit-button').addEventListener('click', saveValues)
document.getElementById('submit-button').addEventListener('click', () => {
  window.close()
})
