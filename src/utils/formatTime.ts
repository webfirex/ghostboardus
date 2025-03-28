// utils/timeUtils.ts
export const formatTimestamp = (timestamp: number): string => {
  // Convert the timestamp from milliseconds to a Date object
  const date = new Date(timestamp);

  // Format the time to HH:MM:SS AM/PM in EST
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", // EST/EDT timezone
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format with AM/PM
  }).format(date);
};
  