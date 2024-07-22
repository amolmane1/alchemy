export const formatDate = (
  input: Date | { _seconds: number; _nanoseconds: number }
): { year: string; date: string; weekday: string; time: string } => {
  const date = input instanceof Date ? input : new Date(input._seconds * 1000);

  if (isNaN(date.getTime())) {
    throw new TypeError("Invalid date");
  }

  const year = date.getFullYear().toString();
  const shortWeekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = shortWeekdayNames[date.getDay()];
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

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeString = `${hours}:${minutes}${ampm}`;

  return {
    year: year,
    date: dateString,
    weekday: weekday,
    time: timeString,
  };
};
