import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
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
  @observable submitting = false;

  @computed get loggedIn() {
    return !!this.currentUser;
  }

  @action register = async (userValues: IUserFormValues) => {
    let registered = false;
    this.submitting = true;
    try {
      registered = await httpRequester.user.register(userValues);
    } catch (error) {
      console.warn(error);
    } finally {
      this.submitting = false;
    }

    return registered;
  };

  @action login = async (userValues: IUserFormValues) => {
    this.submitting = true;
    try {
      this.currentUser = await httpRequester.user.login(userValues);
      this.rootStore.commonStore.setToken(this.currentUser.token);
      history.push("/activities");
    } catch (error) {
      console.warn(error);
    } finally {
      this.submitting = false;
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
