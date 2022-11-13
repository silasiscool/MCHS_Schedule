try {
  chrome.storage.sync.get(['theme'], (res) => {
    setTheme(res.theme)
  })
} catch (e) {
  setTheme(localStorage.getItem('theme'))
}

function setTheme(theme) {
  if (theme === 'dark' || theme === 'use-system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelectorAll('*').forEach((item, i) => {
      item.classList.add('dark-mode')
    });
  }
}
