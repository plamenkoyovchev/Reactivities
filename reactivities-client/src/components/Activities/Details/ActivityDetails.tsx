import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";

import { RootStoreContext } from "../../../shared/stores/rootStore";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

import Loader from "../../UI/Loader/Loader";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loading } = rootStore.activityStore;

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id);
    }
  }, [loadActivity, match.params.id]);

  if (loading) {
    return <Loader />;
  }

  if (!activity) {
    return <h2>Activity not found!</h2>;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar attendees={activity.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
