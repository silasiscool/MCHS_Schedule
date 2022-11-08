// Get HTML elements
let banner = document.getElementById('banner');
let bannerCloseButton = document.getElementById('banner-close-button');
let bannerText = document.getElementById('banner-text');

// Get current Version
let currentVersion

try {
  currentVersion = chrome.runtime.getManifest().version
} catch (e) {

}

// set banner based on banner.json
config_file.then((bannerConfig) => {
  // Dismiss button
  bannerCloseButton.addEventListener('click', () => {
    banner.style.display = 'none';
    banner.classList.remove('active-banner');
    chrome.storage.sync.get(['dismissedBanners'], (res) => {
      let dismissedBanners = res.dismissedBanners
      dismissedBanners.push(bannerConfig.banner.id)
      chrome.storage.sync.set({dismissedBanners: dismissedBanners})
    })
  });

  // set banner text
  bannerText.innerHTML = bannerConfig.banner.text

  // bannerText.innerHTML = '<a href="../options/options.html" target="_blank">hello</a>'

  // set dismissable/undismissable
  if (bannerConfig.banner.non_dismissable) {
    bannerCloseButton.classList.add('non-dismissable');
  }

  // determine whether to show banner
  let showBanner
  // if version correct
  if (bannerConfig.banner.min_version === 'all') {
    showBanner = true
  } else if (bannerConfig.banner.min_version === 'none') {
    showBanner = false
  } else if (bannerConfig.banner.min_version === currentVersion) {
    showBanner = true
  } else {
    let minVersionList = []
    let minVersionStrList = bannerConfig.banner.min_version.split('.').forEach((item)=>minVersionList.push(parseFloat(item)))
    let currentVersionList = []
    let currentVersionStrList = currentVersion.split('.').forEach((item)=>currentVersionList.push(parseFloat(item)))
    let i = 0
    showBanner = false
    while (true) {
      if(minVersionList[i]===currentVersionList[i]) {
        i++
      } else if (minVersionList[i] < currentVersionList[i]) {
        showBanner = true
        break
      } else if (minVersionList[i] === undefined){
        showBanner = true
        break
      } else {
        break
      }
    }
  }

  // if dismissed
  try {
    chrome.storage.sync.get(['dismissedBanners'], (res) => {
      bannerDismised(res)
    })
  } catch (e) {
    bannerDismised({dismissedBanners: []})
  }

  function bannerDismised(res) {
    let dismissedBanners = res.dismissedBanners
    if (dismissedBanners.includes(bannerConfig.banner.id)) {
      showBanner = false
    }

    // showBanner = true
    // show/not showBanner
    if (showBanner) {
      banner.classList.add('active-banner');
    } else {
      banner.style.display = 'none'
    }
  }
})
