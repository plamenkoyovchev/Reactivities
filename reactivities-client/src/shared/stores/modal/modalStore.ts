import { observable, action } from "mobx";
import { RootStore } from "../rootStore";

class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable.shallow modal = {
    open: false,
    body: null
  };

  @action open = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action close = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}

export default ModalStore;
