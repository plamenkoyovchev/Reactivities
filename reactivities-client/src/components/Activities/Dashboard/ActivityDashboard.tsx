import React, { useEffect, useContext } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { Grid, Button } from "semantic-ui-react";
import ActivityList from "../List/ActivityList";

import Loader from "../../UI/Loader/Loader";
import { Link } from "react-router-dom";

const ActivityDashboard = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDateAsc } = activityStore;

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
          <Grid.Column width={16}>
            <Button
              as={Link}
              to="/createActivity"
              positive
              content="Create Activity"
            ></Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <ActivityList activities={activitiesByDateAsc} />
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
