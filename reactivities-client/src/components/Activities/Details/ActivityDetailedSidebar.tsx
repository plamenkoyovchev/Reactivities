import React from "react";

import { Segment, List } from "semantic-ui-react";
import { IAttendee } from "../../../app/Models/Attendee/IAttendee";

import ActivityDetailedSidebarListItem from "./ActivityDetailedSidebarListItem";

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
        {attendees && attendees.length === 1
          ? `${attendees.length} Person Going`
          : `${attendees.length} People Going`}
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

export default ActivityDetailedSidebar;
