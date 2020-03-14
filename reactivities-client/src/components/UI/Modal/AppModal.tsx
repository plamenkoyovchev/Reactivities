import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { observer } from "mobx-react-lite";

const AppModal = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    close
  } = rootStore.modalStore;
  return (
    <Modal open={open} onClose={close} size="mini">
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default observer(AppModal);
