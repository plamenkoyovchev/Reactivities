import { observable, action, computed, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IUser } from "../../../app/Models/User/IUser";
import httpRequester from "../../axios/httpRequester";

class UserStore {
  @observable loading = false;
  @observable currentUser: IUser | null = null;
  @observable submitting = false;

  @action getCurrentUser = async () => {
    this.loading = true;
    try {
      this.currentUser = await httpRequester.user.getCurrent();
    } catch (error) {
      console.warn(error);
    } finally {
      this.loading = false;
    }
  };
}

export default createContext(UserStore);
