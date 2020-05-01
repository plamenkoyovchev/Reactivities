import React, { useContext } from "react";
import { RootStoreContext } from "../../../shared/stores/rootStore";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const { profileStore } = rootStore;
  const { profile } = profileStore;

  if (!profile) {
    return null;
  }

  return <div>{profile.bio}</div>;
};

export default ProfileAbout;
