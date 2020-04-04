import React, { useContext, useEffect } from "react";

import ProfileHeader from "../components/User/Profile/ProfileHeader";
import ProfileContent from "../components/User/Profile/ProfileContent";

import { RootStoreContext } from "../shared/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Loader from "../components/UI/Loader/Loader";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { getProfile, profile, loading } = rootStore.profileStore;
  const { username } = match.params;

  useEffect(() => {
    getProfile(username);
  }, [getProfile, username]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ProfileHeader profile={profile!} />
      <ProfileContent />
    </>
  );
};

export default observer(ProfilePage);
