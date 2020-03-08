import { createContext } from "react";
import ActivityStore from "./activity/activityStore";
import UserStore from "./user/userStore";

class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;

  constructor() {
    this.activityStore = new ActivityStore();
    this.userStore = new UserStore();
  }
}

export default createContext(new RootStore());
