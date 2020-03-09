import { observable, action, reaction } from "mobx";

class CommonStore {
  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  @observable token: string | null = localStorage.getItem("jwt");
  @observable appLoaded: boolean = false;

  @action setToken = (token: string | null) => {
    this.token = token;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}

export default CommonStore;
