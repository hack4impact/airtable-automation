export const getAllDatesInRange = (date1: string, date2: string): string[] => {
  const allDates: string[] = [];
  const [startyear, startmonth, startday] = date1
    .split("-")
    .map((d) => parseInt(d));
  const [endyear, endmonth, endday] = date2.split("-").map((d) => parseInt(d));

  let day = startday;
  let year = startyear;
  let month = startmonth;
  for (year; year <= endyear; year++) {
    for (month = month >= 13 ? 1 : month; month <= 12; month++) {
      for (day = day >= 32 ? 1 : day; day <= 31; day++) {
        allDates.push(
          `${year}-${month / 10 < 1 ? `0${month}` : month}-${
            day / 10 < 1 ? `0${day}` : day
          }`
        );

        if (year === endyear && month === endmonth && day === endday)
          return allDates;
      }
    }
  }
  return allDates;
};