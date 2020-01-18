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
          <ActivityList activities={activities} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetails />
          <ActivityForm />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
