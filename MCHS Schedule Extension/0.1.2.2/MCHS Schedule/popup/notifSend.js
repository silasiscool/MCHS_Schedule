function notify(notifText) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");

  } else if (Notification.permission === "granted") {
    const notification = new Notification(notifText);

  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notifText);
      }
    });
  }
}
