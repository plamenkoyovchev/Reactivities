import {
  format,
  formatDistance
} from "date-fns";

const dateFormat = "dd-MM-yyyy HH:mm";

export const formatDate = (date, customFormat) => {
  if (!date) {
    throw Error("Invalid date");
  }

  return format(new Date(date), customFormat || dateFormat);
};

export const formatAsDistance = (date) => {
  if (!date) {
    throw Error("Invalid date");
  }

  return formatDistance(new Date(date), new Date());
}