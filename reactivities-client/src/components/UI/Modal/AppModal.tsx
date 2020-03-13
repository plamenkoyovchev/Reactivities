import React, { useContext } from "react";
import { Modal, ModalContent } from "semantic-ui-react";
import { RootStoreContext } from "../../../shared/stores/rootStore";

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

export default AppModal;
