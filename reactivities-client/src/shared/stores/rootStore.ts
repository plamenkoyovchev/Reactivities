import { createContext } from "react";
import ActivityStore from "./activity/activityStore";
import UserStore from "./user/userStore";
import CommonStore from "./common/commonStore";
import ModalStore from "./modal/modalStore";
import ProfileStore from "./user/profile/profileStore";

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;

  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore();
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
