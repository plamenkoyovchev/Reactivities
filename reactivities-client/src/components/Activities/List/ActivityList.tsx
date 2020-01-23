import React, { SyntheticEvent } from "react";
import "./ActivityList.scss";

import { Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import ActivityListItem from "./ListItem/ActivityListItem";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  target: string;
  loading: boolean;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  target,
  loading
}) => {
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {activities.length > 0
            ? activities.map(activity => (
                <ActivityListItem
                  key={activity.id}
                  activity={activity}
                  selectActivity={selectActivity}
                  deleteActivity={deleteActivity}
                  target={target}
                  loading={loading}
                />
              ))
            : "No activities"}
        </Item.Group>
      </Segment>
    </div>
  );
};

export default ActivityList;
