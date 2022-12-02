navigator.serviceWorker.register('sw.js');

function notify(notifText) {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(notifText);
    });
    console.log(notification);
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(notifText);
        });
        // …
      }
    });
  }
}
