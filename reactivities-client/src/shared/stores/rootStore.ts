import { createContext } from "react";
import ActivityStore from "./activity/activityStore";
import UserStore from "./user/userStore";
import CommonStore from "./common/commonStore";
import ModalStore from "./modal/modalStore";

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.activityStore = new ActivityStore();
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore();
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
