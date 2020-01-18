import React, { useState, useEffect } from "react";

import "./ActivityDashboard.scss";
import { Grid, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../../../app/Models/Activity/IActivity";

interface IProps {}

const ActivityDashboard: React.FC<IProps> = props => {
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
          <List>
            {activities.map(({ id, title }) => (
              <List.Item key={id}>{title}</List.Item>
            ))}
          </List>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
