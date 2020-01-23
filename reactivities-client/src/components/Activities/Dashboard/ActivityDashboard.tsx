import React, { useState, useEffect, SyntheticEvent } from "react";
import "./ActivityDashboard.scss";

import { Grid, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityList from "../List/ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import { v4 as uuid } from "uuid";

import httpRequester from "../../../shared/axios/httpRequester";

import Loader from "../../UI/Loader/Loader";

const ActivityDashboard = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState("");

  const selectActivityHandler = (id: string) => {
    var selectedItem = activities.find(a => a.id === id);
    if (selectedItem) {
      setSelectedActivity(selectedItem);
      setEditMode(false);
    }
  };

  const createActivityHandler = () => {
    setEditMode(true);
    setSelectedActivity(null);
  };

  const deleteActivityHandler = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setLoading(true);
    setTarget(event.currentTarget.name);
    httpRequester.activities
      .delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
        if (selectedActivity && selectedActivity.id === id) {
          setSelectedActivity(null);
          setEditMode(false);
        }
      })
      .catch(err => console.warn(err))
      .finally(() => setLoading(false));
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
    setSelectedActivity(activity);
    setEditMode(false);
  };

  useEffect(() => {
    httpRequester.activities
      .get()
      .then(activities => {
        activities = activities.map(activity => {
          activity.date = activity.date.split(".")[0];
          return activity;
        });

        setActivities(activities);
      })
      .catch(err => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
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
            <ActivityList
              activities={activities}
              selectActivity={selectActivityHandler}
              deleteActivity={deleteActivityHandler}
              target={target}
              loading={loading}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            {selectedActivity && !editMode && (
              <ActivityDetails
                selectedActivity={selectedActivity}
                setEditMode={setEditMode}
                setSelectedActivity={setSelectedActivity}
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

export default ActivityDashboard;
