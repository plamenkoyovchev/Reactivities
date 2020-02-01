import React, { useEffect, useContext } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { Grid } from "semantic-ui-react";
import ActivityList from "../List/ActivityList";

import Loader from "../../UI/Loader/Loader";

const ActivityDashboard = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loading) {
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
