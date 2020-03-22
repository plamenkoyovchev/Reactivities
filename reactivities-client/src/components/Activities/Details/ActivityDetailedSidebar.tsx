import React from "react";

import { Segment, List } from "semantic-ui-react";
import { IAttendee } from "../../../app/Models/Attendee/IAttendee";

import ActivityDetailedSidebarListItem from "./ActivityDetailedSidebarListItem";
import { observer } from "mobx-react-lite";

const ActivityDetailedSidebar: React.FC<{ attendees: IAttendee[] }> = ({
  attendees
}) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length}
        {attendees.length === 1 ? ` person` : ` people`} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map(attendee => (
            <ActivityDetailedSidebarListItem
              key={attendee.username}
              attendee={attendee}
            />
          ))}
        </List>
      </Segment>
    </>
  );
};

export default observer(ActivityDetailedSidebar);
