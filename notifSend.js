function notify(notifText) {
  console.log('notifSend 0');
  if (!("Notification" in window)) {
    console.log('notifSend 1');
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    console.log('notifSend 2');
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(notifText);
    console.log(notification);
    // …
  } else if (Notification.permission !== "denied") {
    console.log('notifSend 3');
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      console.log('notifSend 4');
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log('notifSend 5');
        const notification = new Notification(notifText);
        // …
      }
    });
  }
}
