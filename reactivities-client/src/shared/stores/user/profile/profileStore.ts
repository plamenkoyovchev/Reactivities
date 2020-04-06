import { RootStore } from "./../../rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile } from "../../../../app/Models/Profile/IProfile";
import httpRequester from "../../../axios/httpRequester";
import { toast } from "react-toastify";

class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = true;
  @observable profile: IProfile | null = null;
  @observable uploadingPhoto = false;

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

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await httpRequester.profile.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.currentUser) {
            this.rootStore.userStore.currentUser.image = photo.url;
            this.profile.photo = photo;
          }
        }
      });
    } catch (error) {
      toast.error("There was a problem while uploading your photo");
    } finally {
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };
}

export default ProfileStore;
