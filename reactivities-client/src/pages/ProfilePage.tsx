import React, { useContext } from "react";

import ProfileHeader from "../components/User/Profile/ProfileHeader";
import ProfileContent from "../components/User/Profile/ProfileContent";

import { RootStoreContext } from "../shared/stores/rootStore";
import { IProfile } from "../app/Models/Profile/IProfile";

const ProfilePage = () => {
  const rootStore = useContext(RootStoreContext);
  const currentUser = rootStore.userStore.currentUser as IProfile;
  return (
    <>
      <ProfileHeader profile={currentUser} />
      <ProfileContent />
    </>
  );
};

export default ProfilePage;
