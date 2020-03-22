import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";

class ActivityStore {
  @observable activityMap = new Map();
  @observable loading = false;
  @observable activity: IActivity | null = null;
  @observable target = "";
  @observable submitting = false;

  @action loadActivities = async () => {
    this.loading = true;
    try {
      const activities = await httpRequester.activities.get();
      runInAction(() => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityMap.set(activity.id, activity);
        });
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      console.warn(error);
    }
  };

  @computed get activitiesByDateAsc() {
    return this.groupActivitiesByDate(Array.from(this.activityMap.values()));
  }

  groupActivitiesByDate = (activities: IActivity[]) => {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  };

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
        const createdActivity = await httpRequester.activities.create(activity);
        activity.id = createdActivity.id;
        this.activityMap.set(activity.id, activity);
      }

      runInAction(() => {
        this.activity = activity;
      });
    } catch (error) {
      console.warn(error);
      this.activity = null;
    }

    this.submitting = false;
  };

  @action joinActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await httpRequester.activities.attend(activity.id);
    } catch (error) {
      console.warn(error);
    } finally {
      this.submitting = false;
    }
  };

  @action unattend = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await httpRequester.activities.unattend(activity.id);
    } catch (error) {
      console.warn(error);
    } finally {
      this.submitting = false;
    }
  };
}

export default ActivityStore;
