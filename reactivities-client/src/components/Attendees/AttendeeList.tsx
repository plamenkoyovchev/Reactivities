import React from "react";
import { IAttendee } from "../../app/Models/Attendee/IAttendee";
import { List } from "semantic-ui-react";
import AttendeeListItem from "./AttendeeListItem";
interface IProps {
  attendees: IAttendee[];
}

const AttendeeList: React.FC<IProps> = ({ attendees }) => (
  <List horizontal relaxed>
    {attendees.map(attendee => (
      <AttendeeListItem key={attendee.username} attendee={attendee} />
    ))}
  </List>
);

export default AttendeeList;
