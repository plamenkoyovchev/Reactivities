import React, { useContext, Fragment } from "react";
import "./ActivityList.scss";

import { Item, Segment, Label } from "semantic-ui-react";
import ActivityListItem from "./ListItem/ActivityListItem";

import ActivityStore from "../../../shared/stores/activity/activityStore";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDateAsc } = activityStore;
  return (
    <>
      {activitiesByDateAsc.map(([date, activities]) => (
        <Fragment key={date}>
          <Label size="large" color="blue" content={date} />
          <Segment clearing>
            <Item.Group divided>
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
