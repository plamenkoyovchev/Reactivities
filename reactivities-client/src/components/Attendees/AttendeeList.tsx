import React from "react";
import { IAttendee } from "../../app/Models/Attendee/IAttendee";
import { List } from "semantic-ui-react";
import AttendeeListItem from "./AttendeeListItem";
interface IProps {
  attendees: IAttendee[];
}

const AttendeeList: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal relaxed>
      {attendees.length > 0 ? (
        attendees.map(attendee => (
          <AttendeeListItem key={attendee.username} attendee={attendee} />
        ))
      ) : (
        <List.Item>
          <List.Header>There are no attendees yet!</List.Header>
        </List.Item>
      )}
    </List>
  );
};

export default AttendeeList;
