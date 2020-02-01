import React, { useContext } from "react";
import ActivityStore from "../../../../shared/stores/activity/activityStore";
import { Item, Button, Label } from "semantic-ui-react";
import { IActivity } from "../../../../app/Models/Activity/IActivity";

import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface IProps {
  activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const activityStore = useContext(ActivityStore);
  const { deleteActivity, target, submitting } = activityStore;
  const { id, title, date, description, city, venue, category } = activity;

  return (
    <Item>
      <Item.Content>
        <Item.Header as="a">{title}</Item.Header>
        <Item.Meta>{date}</Item.Meta>
        <Item.Description>
          <div>{description}</div>
          <div>
            {city}, {venue}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            name={id}
            loading={target === id && submitting}
            floated="right"
            content="Delete"
            color="red"
            onClick={e => deleteActivity(e, id)}
          />
          <Button
            as={Link}
            to={`/activities/${id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Label basic content={category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default observer(ActivityListItem);
