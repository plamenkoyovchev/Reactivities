import React, { useContext } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import "./ActivityDetailsHeader.scss";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../shared/stores/rootStore";

import { IAttendee } from "../../../app/Models/Attendee/IAttendee";

const ActivityDetailsHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const rootStore = useContext(RootStoreContext);
  const { joinActivity, unattend, submitting } = rootStore.activityStore;
  const { currentUser } = rootStore.userStore;

  const joined = activity.attendees.find(
    a => a.username === currentUser?.username
  );

  const joinActivityHandler = async () => {
    await joinActivity(activity);
    var newAttendee = {
      displayName: currentUser?.displayName,
      username: currentUser?.username,
      image: currentUser?.image,
      isHost: false
    } as IAttendee;
    activity.attendees.push(newAttendee);
  };

  const unAttendHandler = async () => {
    await unattend(activity);
    activity.attendees = activity.attendees.filter(
      a => a.username !== currentUser?.username
    );
  };

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
        {!joined ? (
          <Button
            color="teal"
            onClick={joinActivityHandler}
            loading={submitting}
          >
            Join Activity
          </Button>
        ) : (
          <Button onClick={unAttendHandler} loading={submitting}>
            Cancel attendee
          </Button>
        )}
        <Button color="orange" floated="right">
          Manage event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailsHeader);
