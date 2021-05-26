export function convertScheduleHourInDateFormat(scheduleHour) {
  const [hour, minutes] = scheduleHour.split(':');
  
  const date = new Date();
  
  date.setHours(hour);
  date.setMinutes(minutes);
  
  return date;
}