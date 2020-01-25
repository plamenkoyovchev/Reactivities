import React, { useEffect, useContext } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { Grid, Button } from "semantic-ui-react";
import ActivityList from "../List/ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";

import Loader from "../../UI/Loader/Loader";

const ActivityDashboard = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, openCreateActivityForm, editMode } = activityStore;

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
              onClick={openCreateActivityForm}
              positive
              content="Create Activity"
            ></Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <ActivityList activities={activityStore.activities} />
          </Grid.Column>
          <Grid.Column width={6}>
            {selectedActivity && !editMode && <ActivityDetails />}
            {editMode && (
              <ActivityForm
                key={(selectedActivity && selectedActivity.id) || 0}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);
