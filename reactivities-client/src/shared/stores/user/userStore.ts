import { observable, action, computed, runInAction } from "mobx";
import { IUser } from "../../../app/Models/User/IUser";
import httpRequester from "../../axios/httpRequester";
import { IUserFormValues } from "../../../app/Models/User/IUserFormValues";
import { history } from "../../..";

import { RootStore } from "../rootStore";
import { toast } from "react-toastify";

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
      toast.success("Registration was successful! Please Login!");
    } catch (error) {
      throw error;
    }

    return registered;
  };

  @action login = async (userValues: IUserFormValues) => {
    try {
      this.currentUser = await httpRequester.user.login(userValues);
      this.rootStore.commonStore.setToken(this.currentUser.token);
      this.rootStore.commonStore.setRefreshToken(this.currentUser.refreshToken);

      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setRefreshToken(null);
    this.currentUser = null;

    history.push("/");
  };

  @action fbLogin = async (response: any) => {
    this.loading = true;
    try {
      const user = await httpRequester.user.fbLogin(response.accessToken);
      runInAction(() => {
        this.currentUser = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.close();
      history.push("/activities");
    } catch (error) {
      toast.error("Login with Facebook failed!");
    } finally {
      this.loading = false;
    }
  };

  @action getCurrentUser = async () => {
    this.loading = true;
    try {
      this.currentUser = await httpRequester.user.getCurrent();
    } catch (error) {
      toast.warn("Please login!");
      history.push("/");
    } finally {
      this.loading = false;
    }
  };
}

export default UserStore;
