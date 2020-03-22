import React, { useContext, Fragment } from "react";
import "./ActivityList.scss";

import { Item, Label } from "semantic-ui-react";
import ActivityListItem from "./ListItem/ActivityListItem";

import { RootStoreContext } from "../../../shared/stores/rootStore";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { activitiesByDateAsc } = rootStore.activityStore;
  return (
    <>
      {activitiesByDateAsc.map(([date, activities]) => (
        <Fragment key={date}>
          <Label size="large" color="blue" content={date} />
          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default ActivityList;
