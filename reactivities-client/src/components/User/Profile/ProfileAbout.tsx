import React, { useContext } from "react";
import { RootStoreContext } from "../../../shared/stores/rootStore";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const { profileStore } = rootStore;
  const { profile } = profileStore;

  if (!profile) {
    return null;
  }

  return (
    <div>
      <h2>About</h2>
      <hr />
      <h4>{profile.bio}</h4>
    </div>
  );
};

export default ProfileAbout;
