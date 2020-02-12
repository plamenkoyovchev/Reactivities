import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../app/Models/Activity/IActivity";

import { history } from "../..";
import { toast } from "react-toastify";

const httpStatusCodes = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  const { status, config, data } = error.response;
  if (status === httpStatusCodes.NOT_FOUND) {
    history.push("/notfound");
    return;
  }

  if (
    status === httpStatusCodes.BAD_REQUEST &&
    config.method.toLowerCase() === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
    return;
  }

  if (status === httpStatusCodes.SERVER_ERROR) {
    toast.error("Server error!");
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, data: {}) => axios.post(url, data).then(responseBody),
  put: (url: string, data: {}) => axios.put(url, data).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

const activities = {
  get: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string): Promise<IActivity> =>
    requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`)
};

export default {
  activities
};
