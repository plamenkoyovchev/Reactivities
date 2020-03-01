import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import "./ActivityDetailsHeader.scss";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import { observer } from "mobx-react-lite";

const ActivityDetailsHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  return (
    <Segment.Group className="activity-header">
      <Segment basic attached="top" style={{ padding: 0 }}>
        <Image
          className="activity-image"
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
        />
        <Segment basic className="activity-image-text">
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content={activity.title} id="header-text" />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Pako</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendee</Button>
        <Button color="orange" floated="right">
          Manage event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailsHeader);
