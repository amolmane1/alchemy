export const formatDate = (
  inputString: string
): { year: string; date: string; weekday: string; time: string } => {
  // Convert the ISO string to a Date object
  const date = new Date(inputString);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    throw new TypeError("Invalid ISO date string");
  }

  // Get the local year as a string
  const year = date.getFullYear().toString();

  // Get the local weekday name (short)
  const shortWeekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = shortWeekdayNames[date.getDay()];

  // Get the local month and day, and format them
  const shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = shortMonthNames[date.getMonth()];

  // Add appropriate ordinal suffix to the day
  const ordinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const dateString = `${weekday} ${day}${ordinalSuffix(day)} ${month}`;

  // Get the local hours and minutes, and format them
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const timeString = `${hours}:${minutes}${ampm}`;

  return {
    year: year,
    date: dateString,
    weekday: weekday,
    time: timeString,
  };
};
