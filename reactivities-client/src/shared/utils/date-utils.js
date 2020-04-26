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

export const combineDateAndTime = (date, time) => {
  const timeString = `${time.getHours()}:${time.getMinutes()}:00`;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;

  return new Date(`${dateString} ${timeString}`);
}