import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../app/Models/Activity/IActivity";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  console.log(error.response);
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
