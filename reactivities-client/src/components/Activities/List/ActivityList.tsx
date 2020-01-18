import React, { useState } from "react";
import "./ActivityList.scss";

import { Item, Image, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityListItem from "./ListItem/ActivityListItem";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ activities, selectActivity }) => {
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {activities.map(activity => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              selectActivity={selectActivity}
            />
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
};

export default ActivityList;
