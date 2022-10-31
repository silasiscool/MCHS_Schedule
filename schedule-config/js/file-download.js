const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/schedules.json?nocache='+(Math.random()+'').replace('.','')).then(res => res.json());

function downloadFile(data) {
  const file = new File([data], 'schedules.json', {type: 'application/json'})
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}


config_file.then((config) => {







  // downloadFile(JSON.stringify(config.day_types))
})
