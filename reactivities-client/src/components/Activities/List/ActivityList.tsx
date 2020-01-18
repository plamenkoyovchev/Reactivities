import React from "react";
import "./ActivityList.scss";

import { Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityListItem from "./ListItem/ActivityListItem";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity
}) => {
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {activities.map(activity => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              selectActivity={selectActivity}
              deleteActivity={deleteActivity}
            />
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
};

export default ActivityList;
