import { IAttendee } from "./../../../app/Models/Attendee/IAttendee";
import { IUser } from "./../../../app/Models/User/IUser";
import { RootStore } from "./../rootStore";
import { observable, action, computed, runInAction, reaction } from "mobx";
import { SyntheticEvent } from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import httpRequester from "../../axios/httpRequester";
import { toast } from "react-toastify";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";

const LIMIT = 10;

class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.filter.keys(),
      () => {
        this.page = 0;
        this.activityMap.clear();
        this.loadActivities();
      }
    );
  }

  @observable activityMap = new Map();
  @observable loading = false;
  @observable activity: IActivity | null = null;
  @observable target = "";
  @observable submitting = false;
  @observable.ref hubConnection: HubConnection | null = null;
  @observable activitiesCount: number = 0;
  @observable page: number = 0;
  @observable filter = new Map();

  @action setFilter = (filter: string, value: string | Date) => {
    this.filter.clear();
    if (filter !== "all") {
      this.filter.set(filter, value);
    }
  };

  @computed get activityFilterParams() {
    const params = new URLSearchParams();

    params.append("limit", String(LIMIT));
    params.append("offset", `${this.page ? this.page * LIMIT : 0}`);

    this.filter.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value);
      }
    });

    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.activitiesCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        if (this.hubConnection?.state === HubConnectionState.Connected) {
          this.hubConnection?.invoke("AddToGroup", this.activity?.id);
          toast.success("Chat connection successful");
        }
      })
      .catch(() => toast.warn("Chat connection problem"));

    this.hubConnection.on("ReceiveComment", (comment) => {
      runInAction(() => {
        this.activity?.comments.push(comment);
      });
    });

    this.hubConnection.on("Send", (message) => toast.info(message));
  };

  @action stopHubConnection = () => {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection
        ?.invoke("RemoveFromGroup", this.activity?.id)
        .then(() => {
          this.hubConnection?.stop().then(() => {
            this.activity = null;
          });
        })
        .catch();
    }
  };

  @action addComment = async (values: any) => {
    values.activityId = this.activity?.id;

    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      toast.error("Unable to add comment");
    }
  };

  @action loadActivities = async () => {
    this.loading = true;
    try {
      const activitiesContainer = await httpRequester.activities.get(
        this.activityFilterParams
      );
      const { activities, activitiesCount } = activitiesContainer;

      const user = this.rootStore.userStore.currentUser!;
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.setActivityProps(activity, user);
          this.activityMap.set(activity.id, activity);
        });
        this.activitiesCount = activitiesCount;
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
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
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
      let activity = await httpRequester.activities.details(id);
      runInAction(() => {
        this.setActivityProps(activity, this.rootStore.userStore.currentUser!);
        activity.date = new Date(activity.date);
        this.activity = activity;
      });

      return activity;
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
      if (activity.id) {
        const updatedActivity = await httpRequester.activities.update(activity);
        activity.attendees = updatedActivity.attendees;
        activity.comments = updatedActivity.comments;
        this.setActivityProps(activity, this.rootStore.userStore.currentUser!);
        this.activityMap.set(activity.id, activity);
      } else {
        const createdActivity = await httpRequester.activities.create(activity);
        activity.isHosting = true;
        activity.id = createdActivity.id;
        activity.attendees = createdActivity.attendees;
        activity.comments = [];
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
