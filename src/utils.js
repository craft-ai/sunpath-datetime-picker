export function extractWeights({ hour, minute }) {
  const t = (hour + minute / 60) / 24;
  const day = Math.sin((t * 2 + 3 / 2) * Math.PI) / 2 + 0.5; // 0 is full night, 1 is full day
  return { t, day };
}

export function addTime(t1, t2) {
  let result = {
    weekday: (t1.weekday || 0) + (t2.weekday || 0),
    hour: (t1.hour || 0) + (t2.hour || 0),
    minute: (t1.minute || 0) + (t2.minute || 0),
  };
  while (result.minute > 59) {
    result.hour += 1;
    result.minute -= 60;
  }
  while (result.minute < 0) {
    result.hour -= 1;
    result.minute += 60;
  }
  while (result.hour > 23) {
    result.weekday += 1;
    result.hour -= 24;
  }
  while (result.hour < 0) {
    result.weekday -= 1;
    result.hour += 24;
  }
  while (result.weekday > 6) {
    result.weekday -= 7;
  }
  while (result.weekday < 0) {
    result.weekday += 7;
  }
  return result;
}
