let banner = document.getElementById('banner');
let bannerContent = document.getElementById('banner-content');
let bannerDismissButton = document.getElementById('banner-dismiss-button');

bannerDismissButton.addEventListener('click', () => {
  dismissedBanners.push(config.banner.id);
  setOption('dismissedBanners',dismissedBanners);
  showBanner(false);
})

async function updateBanner() {
  if (
    getQueryStringParameters().hideBanner
    || config.banner.min_version == 'none'
    || !dismissedBanners
    || dismissedBanners.includes(config.banner.id)
  ) {
    showBanner(false)
  } else if (config.banner.min_version == 'all' || versionNumberCompare(await getVersion(), config.banner.min_version, '>=')) {
    showBanner(true)
  } else showBanner(false)
}

function showBanner(showBanner) {
  if (showBanner) {
    bannerContent.innerHTML = config.banner.text;
    if (config.banner.non_dismissable) {
      banner.classList.remove('dismissable')
    } else {
      banner.classList.add('dismissable')
    }
    root.style.setProperty('--banner-height', banner.clientHeight + 'px');
    banner.classList.add('show');
  } else {
    banner.classList.remove('show')
    root.style.setProperty('--banner-height', 0);
    // bannerContent.innerHTML = '';
  }
}
