import getDay from "date-fns/getDay";

export function prepareMonthLists(daysInYear) {
  let months = [];
  let month = -1;
  let x = new Date();
  x.getDate();
  daysInYear.forEach((day) => {
    if (day.getDate() === 1) {
      month += 1;
      months[month] = [];
      let dayOfWeek = getDay(day) - 1;
      if (dayOfWeek === -1) {
        dayOfWeek = 6;
      }
      for (let i = 0; i < dayOfWeek; i++) {
        months[month].push(0);
      }
    }
    months[month].push(day);
  });
  let result = [];

  const chunkSize = 7;

  months.forEach((month, index) => {
    result.push([]);
    for (let i = 0; i < month.length; i += chunkSize) {
      const chunk = month.slice(i, i + chunkSize);
      result[index].push(chunk);
    }
  });
  console.log(result);
  return result;
}
