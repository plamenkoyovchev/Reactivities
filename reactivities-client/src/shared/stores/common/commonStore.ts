import { observable, action, reaction } from "mobx";

class CommonStore {
  constructor() {
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );

    reaction(
      () => this.refreshToken,
      (refreshToken) => {
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          localStorage.removeItem("refreshToken");
        }
      }
    );
  }

  @observable token: string | null = localStorage.getItem("jwt");
  @observable refreshToken: string | null = localStorage.getItem(
    "refreshToken"
  );
  @observable appLoaded: boolean = false;

  @action setToken = (token: string | null) => {
    this.token = token;
  };

  @action setRefreshToken = (refreshToken: string | null) => {
    this.refreshToken = refreshToken;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}

export default CommonStore;
