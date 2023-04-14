function setThemeColors(primary, background, useDarkStyleBorders) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--background', background);
  if (useDarkStyleBorders) {
    document.body.classList.add('use-dark-style-borders');
    root.style.setProperty('color-scheme', 'dark');
  } else {
    document.body.classList.remove('use-dark-style-borders');
    root.style.setProperty('color-scheme', 'light');
  };
};

function usePresetTheme(tempTheme) {
  if (tempTheme == 'dark') {
    setThemeColors('#fff','#222427', true);
  } else {
    setThemeColors('#000', '#fff', false);
  }
};

function useSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    usePresetTheme('dark');
  } else {
    usePresetTheme('light');
  };
};

function useSetTheme() {
  if (['dark','light'].includes(theme)) {
    usePresetTheme(theme)
  } else if (theme?.custom) {
    setThemeColors(theme.primary, theme.background, theme.useDarkStyleBorders)
  } else {
    useSystemTheme()
  }
}
