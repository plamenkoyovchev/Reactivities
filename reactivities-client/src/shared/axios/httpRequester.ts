import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../app/Models/Activity/IActivity";

import { history } from "../..";
import { toast } from "react-toastify";
import { IUser } from "../../app/Models/User/IUser";
import { IUserFormValues } from "../../app/Models/User/IUserFormValues";

const httpStatusCodes = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - check your connectivity");
    return;
  }

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

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, data: {}) => axios.post(url, data).then(responseBody),
  put: (url: string, data: {}) => axios.put(url, data).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

const activities = {
  get: (): Promise<IActivity[]> => request.get("/activities"),
  details: (id: string): Promise<IActivity> => request.get(`/activities/${id}`),
  create: (activity: IActivity) => request.post("/activities", activity),
  update: (activity: IActivity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete(`/activities/${id}`)
};

const user = {
  getCurrent: (): Promise<IUser> => request.get("/user"),
  register: (user: IUserFormValues): Promise<boolean> =>
    request.post("/user/register", user),
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/login", user)
};

export default {
  activities,
  user
};
