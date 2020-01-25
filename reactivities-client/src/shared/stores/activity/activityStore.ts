import { observable, action } from "mobx";
import { createContext } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loading = false;

  @action loadActivities = () => {
    this.loading = true;
    httpRequester.activities
      .get()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activities.push(activity);
        });
      })
      .catch(err => console.warn(err))
      .finally(() => (this.loading = false));
  };
}

export default createContext(new ActivityStore());
