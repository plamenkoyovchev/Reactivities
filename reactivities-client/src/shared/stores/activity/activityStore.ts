import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable selectedActivity: IActivity | null = null;
  @observable editMode = false;
  @observable target = "";

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

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id) || null;
  };

  @action deleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.loading = true;
    this.target = event.currentTarget.name;
    httpRequester.activities
      .delete(id)
      .then(() => {
        this.activities = this.activities.filter(a => a.id !== id);
        if (this.selectedActivity && this.selectedActivity.id === id) {
          this.selectedActivity = null;
          this.editMode = false;
        }
      })
      .catch(err => console.warn(err))
      .finally(() => {
        this.loading = false;
      });
  };

  @action deselectActivity = () => {
    this.selectedActivity = null;
  };
}

export default createContext(new ActivityStore());
