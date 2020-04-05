import { RootStore } from "./../../rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile } from "../../../../app/Models/Profile/IProfile";
import httpRequester from "../../../axios/httpRequester";

class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = true;
  @observable profile: IProfile | null = null;

  @computed get isCurrentUser() {
    const currentUser = this.rootStore.userStore.currentUser;
    if (currentUser && this.profile) {
      return currentUser.username === this.profile.username;
    }

    return false;
  }

  @action getProfile = async (username: string) => {
    this.loading = true;
    try {
      const profile = await httpRequester.profile.get(username);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export default ProfileStore;
