export default function timeToSeconds(timeString) {
  const timeParts = timeString.match(/\d+[dhms]/g);
  let totalSeconds = 0;

  if (timeParts) {
    timeParts.forEach((part) => {
      const value = parseInt(part);
      if (part.includes("d")) {
        totalSeconds += value * 24 * 60 * 60; // Convert days to seconds
      } else if (part.includes("h")) {
        totalSeconds += value * 60 * 60; // Convert hours to seconds
      } else if (part.includes("m")) {
        totalSeconds += value * 60; // Convert minutes to seconds
      } else if (part.includes("s")) {
        totalSeconds += value; // Seconds
      }
    });
  }

  return totalSeconds;
}
