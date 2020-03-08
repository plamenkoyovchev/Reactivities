import React, { useEffect, useContext } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import RootStore from "../../../shared/stores/rootStore";

import { Grid } from "semantic-ui-react";
import ActivityList from "../List/ActivityList";

import Loader from "../../UI/Loader/Loader";

const ActivityDashboard = () => {
  const rootStore = useContext(RootStore);
  const { loadActivities, loading } = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <ActivityList />
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Activity Filters</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);
