export function formatDateToTz(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  
    return formatter.format(date);
}

export const convertUtcToEst = (utcDateString: string): string => {
  // Create a Date object from the UTC date string
  const utcDate = new Date(utcDateString);

  // Convert to EST (Eastern Standard Time)
  const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
  };

  // Format the date string
  const estDateString = utcDate.toLocaleString('en-US', {
      timeZone: 'America/New_York', // EST timezone
      ...options,
  });

  // Split the date and time parts
  const [datePart, timePart] = estDateString.split(', ');

  // Format the output to dd-mm-yy
  const [month, day, year] = datePart.split('/');
  const formattedDate = `${day}-${month}-${year}`;

  // Combine time and formatted date
  return `${timePart} ${formattedDate}`;
};

export function convertUtcToEstTime(utcTime: string): string {
  // Split the input time into hours, minutes, and seconds
  const [hours, minutes, seconds] = utcTime.split(":").map(Number);

  // Create a Date object with UTC time
  const utcDate = new Date();
  utcDate.setUTCHours(hours, minutes, seconds);

  // Convert to EST (Eastern Standard Time)
  const estDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "America/New_York" }));

  // Get hours and minutes for EST
  let estHours = estDate.getHours();
  const estMinutes = estDate.getMinutes();

  // Determine AM or PM
  const period = estHours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  estHours = estHours % 12 || 12;

  // Format hours and minutes with leading zero if necessary
  const formattedTime = `${estHours}:${estMinutes.toString().padStart(2, "0")} ${period}`;

  return formattedTime;
}