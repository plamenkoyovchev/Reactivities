import { IAttendee } from "./../../../app/Models/Attendee/IAttendee";
import { IUser } from "./../../../app/Models/User/IUser";
import { RootStore } from "./../rootStore";
import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";
import { toast } from "react-toastify";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activityMap = new Map();
  @observable loading = false;
  @observable activity: IActivity | null = null;
  @observable target = "";
  @observable submitting = false;
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => toast.success("Chat connection successful"))
      .catch(() => toast.warn("Chat connection problem"));

    this.hubConnection.on("ReceiveComment", (comment) => {
      runInAction(() => {
        if (this.activity) {
          this.activity.comments.push(comment);
        }
      });
    });
  };

  @action loadActivities = async () => {
    this.loading = true;
    try {
      const activities = await httpRequester.activities.get();
      const user = this.rootStore.userStore.currentUser!;
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.setActivityProps(activity, user);
          this.activityMap.set(activity.id, activity);
        });
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      toast.error("Unable to load activities");
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

      this.setActivityProps(activity, this.rootStore.userStore.currentUser!);
      this.activity = activity;
    } catch (error) {
      toast.error("Unable to load activity");
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
      toast.error("Unable to delete activity");
    } finally {
      this.submitting = false;
    }
  };

  @action saveActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      if (activity.id !== "") {
        await httpRequester.activities.update(activity);
        this.setActivityProps(activity, this.rootStore.userStore.currentUser!);
        this.activityMap.set(activity.id, activity);
      } else {
        const createdActivity = await httpRequester.activities.create(activity);
        activity.isHosting = true;
        activity.id = createdActivity.id;
        activity.attendees = createdActivity.attendees;

        this.setActivityProps(activity, this.rootStore.userStore.currentUser!);
        this.activityMap.set(activity.id, activity);
      }

      runInAction(() => {
        this.activity = activity;
      });
    } catch (error) {
      toast.error("Unable to save activity");
      this.activity = null;
    }

    this.submitting = false;
  };

  @action joinActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await httpRequester.activities.attend(activity.id);
      const { currentUser } = this.rootStore.userStore;
      var newAttendee = {
        displayName: currentUser?.displayName,
        username: currentUser?.username,
        image: currentUser?.image,
        isHost: false,
      } as IAttendee;

      if (this.activity) {
        this.activity.isGoing = true;
        this.activity.attendees.push(newAttendee);
        this.activityMap.set(this.activity.id, this.activity);
      }
    } catch (error) {
      toast.error("Unable to join activity");
    } finally {
      this.submitting = false;
    }
  };

  @action unattend = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await httpRequester.activities.unattend(activity.id);

      const { currentUser } = this.rootStore.userStore;
      if (this.activity) {
        this.activity.attendees = activity.attendees.filter(
          (a) => a.username !== currentUser?.username
        );
        this.activity.isGoing = false;
        this.activityMap.set(this.activity.id, this.activity);
      }
    } catch (error) {
      toast.error("Unable to cancel attendance");
    } finally {
      this.submitting = false;
    }
  };

  setActivityProps = (activity: IActivity, user: IUser) => {
    activity.isGoing = activity.attendees.some(
      (a) => a.username === user?.username
    );
    activity.isHosting = activity.attendees.some(
      (a) => a.username === user?.username && a.isHost
    );
  };
}

export default ActivityStore;
