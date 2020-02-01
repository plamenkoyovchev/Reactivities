import React, { useContext } from "react";
import "./ActivityList.scss";

import { Item, Segment } from "semantic-ui-react";
import ActivityListItem from "./ListItem/ActivityListItem";

import ActivityStore from "../../../shared/stores/activity/activityStore";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDateAsc } = activityStore;
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {activitiesByDateAsc.length > 0
            ? activitiesByDateAsc.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))
            : "No activities"}
        </Item.Group>
      </Segment>
    </div>
  );
};

export default observer(ActivityList);
