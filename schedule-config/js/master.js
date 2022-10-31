const sideNavButton = document.getElementById('side-nav-button');
const sideNav = document.getElementsByClassName('side-nav')[0];

sideNavButton.addEventListener('click', () => {
  sideNav.classList.toggle('open');
});
