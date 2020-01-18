import React, { useState, useEffect } from "react";

import "./ActivityDashboard.scss";
import { Grid, List } from "semantic-ui-react";
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

  const selectActivityHandler = (id: string) => {
    var selectedItem = activities.find(a => a.id === id);
    if (selectedItem) {
      setSelectedActivity(selectedItem);
    }
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
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivityHandler}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && (
            <ActivityDetails selectedActivity={selectedActivity} />
          )}
          <ActivityForm />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
