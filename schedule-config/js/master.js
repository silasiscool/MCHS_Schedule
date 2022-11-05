const config_file = fetch('https://raw.githubusercontent.com/silasiscool/MCHS_Schedule/main/config.json?nocache='+(Math.random()+'').replace('.','')).then(res => res.json());

const sideNavButton = document.getElementById('side-nav-button');
const sideNav = document.getElementsByClassName('side-nav')[0];
const downloadButton = document.getElementById('download-file-button')
const content = document.getElementsByClassName('content')[0]

sideNavButton.addEventListener('click', () => {
  sideNav.classList.toggle('open');
  sideNavButton.classList.toggle('open');
});

downloadButton.addEventListener('click', () => {
  if (window.confirm("Confirm Download Updated File?")) {
    downloadFile(sessionStorage.getItem('configFile'))
  }
})

content.addEventListener('click', () => {
  sideNav.classList.remove('open');
  sideNavButton.classList.remove('open');
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

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function monthDayYear(date) {
  return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
};

Array.from(document.getElementsByTagName('a')).forEach((item) => {
  if (['Day Schedule','Week Schedule','Week Types', 'Nameable Classes'].includes(item.innerHTML)) {
    item.style.display = 'none'
  }
});
