import React, { useContext } from "react";

import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import ProfileCard from "./ProfileCard";
import { observer } from "mobx-react-lite";

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    followings,
    activeTab,
    profileFollowingTabs,
    loading,
  } = rootStore.profileStore;
  const { displayName } = profile!;

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === profileFollowingTabs.followers
                ? `People following ${displayName}`
                : `People ${displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group>
            {followings.map((profile) => (
              <ProfileCard
                key={profile.username}
                profile={profile}
                followers={activeTab === profileFollowingTabs.followers}
              />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
