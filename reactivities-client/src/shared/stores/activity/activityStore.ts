import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";
import { v4 as uuid } from "uuid";

class ActivityStore {
  @observable activityMap = new Map();
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

  @action selectActivity = (id: string) => {
    this.editMode = false;
    this.selectedActivity = this.activityMap.get(id);
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
      if (this.selectedActivity && this.selectedActivity.id === id) {
        this.selectedActivity = null;
        this.editMode = false;
        this.target = "";
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.submitting = false;
    }
  };

  @action openCreateActivityForm = () => {
    this.editMode = true;
    this.selectedActivity = null;
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

      this.selectedActivity = activity;
    } catch (error) {
      console.warn(error);
      this.selectedActivity = null;
    }

    this.editMode = false;
    this.submitting = false;
  };

  @action setEditMode = (on: boolean) => {
    this.editMode = on;
  };

  @action deselectActivity = () => {
    this.selectedActivity = null;
  };
}

export default createContext(new ActivityStore());
