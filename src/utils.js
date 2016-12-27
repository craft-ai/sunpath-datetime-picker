export function extractWeights({ hour, minute }) {
  const t = (hour + minute / 60) / 24;
  const day = Math.sin((t * 2 + 3 / 2) * Math.PI) / 2 + 0.5; // 0 is full night, 1 is full day
  return { t, day };
}
