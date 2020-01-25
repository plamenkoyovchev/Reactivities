import React from "react";
import "./ActivityList.scss";

import { Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityListItem from "./ListItem/ActivityListItem";

interface IProps {
  activities: IActivity[];
}

const ActivityList: React.FC<IProps> = ({ activities }) => {
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {activities.length > 0
            ? activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))
            : "No activities"}
        </Item.Group>
      </Segment>
    </div>
  );
};

export default ActivityList;
