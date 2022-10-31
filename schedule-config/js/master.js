const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/config.json?nocache='+(Math.random()+'').replace('.','')).then(res => res.json());

const sideNavButton = document.getElementById('side-nav-button');
const sideNav = document.getElementsByClassName('side-nav')[0];
const downloadButton = document.getElementById('download-file-button')

sideNavButton.addEventListener('click', () => {
  sideNav.classList.toggle('open');
  sideNavButton.classList.toggle('open');
});

downloadButton.addEventListener('click', () => {
  if (window.confirm("Confirm Download Updated File?")) {
    downloadFile(sessionStorage.getItem('configFile'))
  }
})

function downloadFile(data) {
  const file = new File([data], 'config.json', {type: 'application/json'})
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}


Array.from(document.getElementsByTagName('a')).forEach((item) => {
  if (['Day Schedule','Week Schedule','Day Types','Week Types', 'Nameable Classes','Chamber Days','Jazz Days'].includes(item.innerHTML)) {
    item.style.display = 'none'
  }
});
