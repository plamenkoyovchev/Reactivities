import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";
import { v4 as uuid } from "uuid";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable selectedActivity: IActivity | null = null;
  @observable editMode = false;
  @observable target = "";
  @observable submitting = false;

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

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await httpRequester.activities.delete(id);
      this.activities = this.activities.filter(a => a.id !== id);
      if (this.selectedActivity && this.selectedActivity.id === id) {
        this.selectedActivity = null;
        this.editMode = false;
        this.submitting = false;
      }
    } catch (error) {
      console.warn(error);
      this.submitting = false;
    }
  };

  @action deselectActivity = () => {
    this.selectedActivity = null;
  };

  @action openCreateActivityForm = () => {
    this.editMode = true;
    this.selectedActivity = null;
  };

  @action setEditMode = (on: boolean) => {
    this.editMode = on;
  };

  @action saveActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      if (activity.id !== "") {
        await httpRequester.activities.update(activity);
        this.activities = [
          ...this.activities.filter(a => a.id !== activity.id),
          activity
        ];
      } else {
        activity.id = uuid();
        await httpRequester.activities.create(activity);
        this.activities = [activity, ...this.activities];
      }

      this.selectedActivity = activity;
    } catch (error) {
      console.warn(error);
      this.selectedActivity = null;
    }

    this.editMode = false;
    this.submitting = false;
  };
}

export default createContext(new ActivityStore());
