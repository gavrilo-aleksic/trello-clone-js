const MONTHS = [
  "Januar",
  "February",
  "Marth",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export const formatDate = (date) => {
  const parsedDate = new Date(date);
  return `${
    MONTHS[parsedDate.getMonth()]
  } ${parsedDate.getDate()}, ${parsedDate.getFullYear()} at ${parsedDate.toLocaleTimeString()}`;
};
