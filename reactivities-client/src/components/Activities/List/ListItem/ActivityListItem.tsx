import React from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { IActivity } from "../../../../app/Models/Activity/IActivity";

interface IProps {
  activity: IActivity;
  selectActivity: (id: string) => void;
}

const ActivityListItem: React.FC<IProps> = ({ activity, selectActivity }) => {
  const { id, title, date, description, city, venue } = activity;
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
            floated="right"
            content="View"
            color="blue"
            onClick={() => selectActivity(id)}
          />
          <Label basic content="Category" />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ActivityListItem;
