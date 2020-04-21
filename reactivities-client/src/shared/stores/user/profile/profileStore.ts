import { RootStore } from "./../../rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile, IPhoto } from "../../../../app/Models/Profile/IProfile";
import httpRequester from "../../../axios/httpRequester";
import { toast } from "react-toastify";

class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loadingProfile = true;
  @observable loading = false;
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
    this.loadingProfile = true;
    try {
      const profile = await httpRequester.profile.get(username);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => {
        this.loadingProfile = false;
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

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await httpRequester.profile.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.currentUser!.image = photo.url;
        var currentMainPhoto = this.profile?.photos.find((p) => p.isMain);
        if (currentMainPhoto) {
          currentMainPhoto.isMain = false;
        }

        var newPhotoToSetMain = this.profile?.photos.find(
          (p) => p.id === photo.id
        );
        if (newPhotoToSetMain) {
          newPhotoToSetMain.isMain = true;
        }

        this.profile!.photo = photo;
      });
    } catch (error) {
      toast.error("There was an error while setting your main photo");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await httpRequester.profile.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile?.photos!.filter(
          (p) => p.id !== photo.id
        );
      });
    } catch (error) {
      toast.error("There was an error while deleting photo");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action follow = async (username: string) => {
    this.loading = true;
    try {
      await httpRequester.profile.follow(username);
      runInAction(() => {
        if (this.profile) {
          this.profile.following = true;
          this.profile.followersCount++;
        }
      });
    } catch (error) {
      toast.error(`Unable to follow ${username}`);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action unfollow = async (username: string) => {
    this.loading = true;
    try {
      await httpRequester.profile.unfollow(username);
      runInAction(() => {
        if (this.profile) {
          this.profile.following = false;
          this.profile.followersCount--;
        }
      });
    } catch (error) {
      toast.error(`Unable to unfollow ${username}`);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export default ProfileStore;
