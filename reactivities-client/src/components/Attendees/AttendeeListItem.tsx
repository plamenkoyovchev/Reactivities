import React from "react";
import { IAttendee } from "../../app/Models/Attendee/IAttendee";
import { List, Image, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  attendee: IAttendee;
}

const AttendeeListItem: React.FC<IProps> = ({ attendee }) => (
  <>
    <List.Item>
      <Popup
        content={attendee.displayName}
        trigger={<Image avatar src={attendee.image || "/assets/user.png"} />}
      />
      <List.Content>
        <List.Header>
          <Link to={`/profile/${attendee.username}`}>{attendee.username}</Link>
        </List.Header>
      </List.Content>
    </List.Item>
  </>
);

export default AttendeeListItem;
