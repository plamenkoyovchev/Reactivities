import { createContext } from "react";
import ActivityStore from "./activity/activityStore";
import UserStore from "./user/userStore";
import CommonStore from "./common/commonStore";

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;

  constructor() {
    this.activityStore = new ActivityStore();
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore();
  }
}

export const RootStoreContext = createContext(new RootStore());
