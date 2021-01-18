// Externals
import moment from "moment";

// Internals
import { normalizeDate } from "./index";

type DateParameter = Date | number | string;

const daysBetween = (
  date1: DateParameter,
  date2: Date | number | string = moment.now()
): number => {
  date1 = normalizeDate(date1);
  date2 = normalizeDate(date2);

  const diff = date2 - date1;

  const diffInDays = (diff / 1000 / 60 / 60 / 24).toFixed(0);

  return parseInt(diffInDays);
};

export default daysBetween;
