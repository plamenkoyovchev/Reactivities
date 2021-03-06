import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../app/Models/Activity/IActivity";

import { history } from "../..";
import { toast } from "react-toastify";
import { IUser } from "../../app/Models/User/IUser";
import { IUserFormValues } from "../../app/Models/User/IUserFormValues";
import { IProfile, IPhoto } from "../../app/Models/Profile/IProfile";
import { FollowingType } from "../../app/Models/Profile/FollowingsType";
import { IActivityContainer } from "../../app/Models/Activity/IActivityContainer";
import { formatDate } from "../utils/date-utils";
import { FilterType } from "../../app/Models/Profile/FilterType";

const httpStatusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  const originalRequest = error.config;
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
    status === httpStatusCodes.UNAUTHORIZED &&
    originalRequest.url.endsWith("refreshToken")
  ) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    history.push("/");
    toast.info("Your session has expired, please login again!");

    return Promise.reject(error);
  }

  if (status === httpStatusCodes.UNAUTHORIZED && !originalRequest._retry) {
    originalRequest._retry = true;
    return axios
      .post("user/refreshToken", {
        token: localStorage.getItem("jwt"),
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((response) => {
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        return axios(originalRequest);
      });
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

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, data: {}) => axios.post(url, data).then(responseBody),
  put: (url: string, data: {}) => axios.put(url, data).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postFormData: (url: string, file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(responseBody);
  },
};

const activities = {
  get: (params: URLSearchParams): Promise<IActivityContainer> =>
    request.get(
      `/v2/activities?limit=${params.get("limit")}&offset=${params.get(
        "offset"
      )}&isGoing=${params.get("isGoing") || false}&isHost=${
        params.get("isHost") || false
      }&startDate=${formatDate(
        params.get("startDate") || new Date(),
        "yyyy-MM-dd"
      )}`
    ),
  details: (id: string): Promise<IActivity> =>
    request.get(`/v2/activities/${id}`),
  create: (activity: IActivity) => request.post("/v2/activities", activity),
  update: (activity: IActivity) =>
    request.put(`/v2/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete(`/v2/activities/${id}`),
  attend: (activityId: string) =>
    request.post(`/v2/activities/${activityId}/attend`, {}),
  unattend: (activityId: string) =>
    request.delete(`/v2/activities/${activityId}/attend`),
  getDates: (): Promise<Date[]> => request.get("/v2/activities/dates"),
};

const user = {
  getCurrent: (): Promise<IUser> => request.get("/user"),
  register: (user: IUserFormValues): Promise<boolean> =>
    request.post("/user/register", user),
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/login", user),
  fbLogin: (accessToken: string) =>
    request.post(`/user/fblogin`, { accessToken }),
  refreshToken: (token: string, refreshToken: string) => {
    return axios
      .post(`/user/refreshToken`, { token, refreshToken })
      .then((response) => {
        const { token, refreshToken } = response.data;
        localStorage.setItem("jwt", token);
        localStorage.setItem("refreshToken", refreshToken);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return token;
      });
  },
};

const profile = {
  get: (username: string): Promise<IProfile> =>
    request.get(`/user/${username}/profile`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    request.postFormData("/photos", photo),
  setMainPhoto: (id: string) => request.post(`/photos/${id}/setmain`, {}),
  deletePhoto: (id: string) => request.delete(`/photos/${id}`),
  follow: (username: string) => request.post(`/user/${username}/follow`, {}),
  unfollow: (username: string) => request.delete(`/user/${username}/unfollow`),
  getFollowings: (username: string, followingType: FollowingType) =>
    request.get(`/user/${username}/followings?followingType=${followingType}`),
  getActivities: (username: string, filter: FilterType) =>
    request.get(`/user/${username}/activities?filter=${filter}`),
};

export default {
  activities,
  user,
  profile,
};
