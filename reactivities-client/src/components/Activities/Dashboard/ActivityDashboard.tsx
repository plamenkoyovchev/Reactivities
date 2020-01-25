import React, { useState, useEffect, useContext } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { Grid, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityList from "../List/ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import { v4 as uuid } from "uuid";

import httpRequester from "../../../shared/axios/httpRequester";

import Loader from "../../UI/Loader/Loader";

const ActivityDashboard = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity } = activityStore;

  const [activities, setActivities] = useState<IActivity[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const createActivityHandler = () => {
    setEditMode(true);
    //setSelectedActivity(null);
  };

  const submitActivityHandler = (activity: IActivity) => {
    setLoading(true);
    if (activity.id !== "") {
      httpRequester.activities
        .update(activity)
        .then(() => {
          setActivities([
            ...activities.filter(a => a.id !== activity.id),
            activity
          ]);
          resetEditForm(activity);
        })
        .catch(err => console.warn(err))
        .finally(() => setLoading(false));
    } else {
      activity.id = uuid();
      httpRequester.activities
        .create(activity)
        .then(() => {
          setActivities([activity, ...activities]);
          resetEditForm(activity);
        })
        .catch(err => console.warn(err))
        .finally(() => setLoading(false));
    }
  };

  const resetEditForm = (activity: IActivity) => {
    //setSelectedActivity(activity);
    setEditMode(false);
  };

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
              onClick={createActivityHandler}
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
            {selectedActivity && !editMode && (
              <ActivityDetails
                selectedActivity={selectedActivity}
                setEditMode={setEditMode}
              />
            )}
            {editMode && (
              <ActivityForm
                key={(selectedActivity && selectedActivity.id) || 0}
                setEditMode={setEditMode}
                selectedActivity={selectedActivity}
                saveActivity={submitActivityHandler}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);
