import React, { useContext } from "react";

import "./ActivityListItem.scss";

import { RootStoreContext } from "../../../../shared/stores/rootStore";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../../app/Models/Activity/IActivity";

import AttendeeList from "../../../Attendees/AttendeeList";

import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface IProps {
  activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteActivity, target, submitting } = rootStore.activityStore;
  const {
    id,
    title,
    date,
    description,
    venue,
    category,
    attendees,
    isGoing,
    isHosting
  } = activity;

  const host = attendees.filter(a => a.isHost)[0];

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              className="profile-picture"
              size="tiny"
              circular
              src="/assets/user.png"
            />
            <Item.Content>
              <Item.Header as="a">{title}</Item.Header>
              {host && (
                <Item.Description>
                  Hosted by {host.displayName}
                </Item.Description>
              )}
              <Item.Description>
                {isGoing && !isHosting && (
                  <Label color="green" content="You are going to this event!" />
                )}
                {isHosting && (
                  <Label color="orange" content="You are hosting this event!" />
                )}
              </Item.Description>
              <Item.Extra>
                {category && <Label basic content={category} />}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {date}
        <Icon name="marker" /> {venue}
      </Segment>
      <Segment secondary>
        <AttendeeList attendees={attendees} />
      </Segment>
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
