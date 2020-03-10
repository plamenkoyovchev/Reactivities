import { observable, action, computed } from "mobx";
import { IUser } from "../../../app/Models/User/IUser";
import httpRequester from "../../axios/httpRequester";
import { IUserFormValues } from "../../../app/Models/User/IUserFormValues";
import { history } from "../../..";

import { RootStore } from "../rootStore";

class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;
  @observable currentUser: IUser | null = null;

  @computed get loggedIn() {
    return !!this.currentUser;
  }

  @action register = async (userValues: IUserFormValues) => {
    let registered = false;
    try {
      registered = await httpRequester.user.register(userValues);
    } catch (error) {
      console.warn(error);
    }

    return registered;
  };

  @action login = async (userValues: IUserFormValues) => {
    try {
      this.currentUser = await httpRequester.user.login(userValues);
      this.rootStore.commonStore.setToken(this.currentUser.token);
      history.push("/activities");
    } catch (error) {
      console.warn(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.currentUser = null;

    history.push("/");
  };

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

export default UserStore;
