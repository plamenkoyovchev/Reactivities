import React, { useState, useEffect } from "react";

import "./ActivityDashboard.scss";
import { Grid, List, Button } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityList from "../List/ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";

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
    }
  };

  const createActivityHandler = () => {
    setEditMode(true);
    setSelectedActivity(null);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => setActivities(response.data))
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
                setEditMode={setEditMode}
                selectedActivity={selectedActivity}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
