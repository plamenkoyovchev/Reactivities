import React, { SyntheticEvent } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { IActivity } from "../../../../app/Models/Activity/IActivity";

interface IProps {
  activity: IActivity;
  selectActivity: (id: string) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  target: string;
  loading: boolean;
}

const ActivityListItem: React.FC<IProps> = ({
  activity,
  selectActivity,
  deleteActivity,
  target,
  loading
}) => {
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
            name={activity.id}
            loading={target === activity.id && loading}
            floated="right"
            content="Delete"
            color="red"
            onClick={e => deleteActivity(e, id)}
          />
          <Button
            floated="right"
            content="View"
            color="blue"
            onClick={() => selectActivity(id)}
          />
          <Label basic content={category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ActivityListItem;
