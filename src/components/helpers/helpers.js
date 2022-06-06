function minutesDisplay(date) {
  let minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    return '0' + minutes;
  }
  return minutes;
}

function hourDisplay(date, offset) {
  let hours = date.getUTCHours().toString();
  hours -= offset;
  if (hours < 0) {
    hours += 24;
  }
  return hours;
}

export { minutesDisplay, hourDisplay };
