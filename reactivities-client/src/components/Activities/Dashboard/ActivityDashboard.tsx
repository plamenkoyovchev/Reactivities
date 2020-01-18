import React, { useState, useEffect } from "react";

import "./ActivityDashboard.scss";
import { Grid, Button } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityList from "../List/ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import { v4 as uuid } from "uuid";

const ActivityDashboard = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

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

  const deleteActivityHandler = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedActivity(null);
      setEditMode(false);
    }
  };

  const submitActivityHandler = (activity: IActivity) => {
    if (activity.id !== "") {
      setActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
    } else {
      activity.id = uuid();
      setActivities([activity, ...activities]);
    }

    setSelectedActivity(activity);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        const activities: IActivity[] = [];
        if (response.data) {
          response.data.forEach(activity => {
            activity.date = activity.date.split(".")[0];
            activities.push(activity);
          });

          setActivities(activities);
        }
      })
      .catch(err => console.warn(err));
  }, []);

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
