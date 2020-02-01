import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";
import { v4 as uuid } from "uuid";

class ActivityStore {
  @observable activityMap = new Map();
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable activity: IActivity | null = null;
  @observable target = "";
  @observable submitting = false;

  @action loadActivities = () => {
    this.loading = true;
    httpRequester.activities
      .get()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityMap.set(activity.id, activity);
        });
      })
      .catch(err => console.warn(err))
      .finally(() => (this.loading = false));
  };

  @computed get activitiesByDateAsc() {
    return Array.from(this.activityMap.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivity = async (id: string) => {
    this.loading = true;
    try {
      let activity = this.activityMap.get(id);
      if (!activity) {
        activity = await httpRequester.activities.details(id);
      }

      this.activity = activity;
    } catch (error) {
      console.warn(error);
    } finally {
      this.loading = false;
    }
  };

  @action cleanActivity = () => {
    this.activity = null;
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await httpRequester.activities.delete(id);
      this.activityMap.delete(id);
      if (this.activity && this.activity.id === id) {
        this.activity = null;
        this.target = "";
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.submitting = false;
    }
  };

  @action saveActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      if (activity.id !== "") {
        await httpRequester.activities.update(activity);
        this.activityMap.set(activity.id, activity);
      } else {
        activity.id = uuid();
        await httpRequester.activities.create(activity);
        this.activityMap.set(activity.id, activity);
      }

      this.activity = activity;
    } catch (error) {
      console.warn(error);
      this.activity = null;
    }

    this.submitting = false;
  };
}

export default createContext(new ActivityStore());
