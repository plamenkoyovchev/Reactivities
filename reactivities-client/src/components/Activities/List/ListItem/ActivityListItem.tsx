import React, { useContext } from "react";
import RootStore from "../../../../shared/stores/rootStore";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../../app/Models/Activity/IActivity";

import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface IProps {
  activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const rootStore = useContext(RootStore);
  const { deleteActivity, target, submitting } = rootStore.activityStore;
  const { id, title, date, description, venue, category } = activity;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="small" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{title}</Item.Header>
              <Item.Description>Hosted by Pako</Item.Description>
              <Item.Extra>
                <Label basic content={category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {date}
        <Icon name="marker" /> {venue}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          as={Link}
          to={`/activities/${id}`}
          floated="right"
          content="View"
          color="blue"
        />

        <Button
          name={id}
          loading={target === id && submitting}
          floated="right"
          content="Delete"
          color="red"
          onClick={e => deleteActivity(e, id)}
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
