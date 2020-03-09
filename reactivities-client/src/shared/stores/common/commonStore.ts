import { observable, action } from "mobx";
import { createContext } from "react";

class CommonStore {
  @observable token: string | null = null;
  @observable appLoaded: boolean = false;

  @action setToken(token: string | null) {
    this.token = token;
    localStorage.setItem("jwt", token!);
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default CommonStore;
