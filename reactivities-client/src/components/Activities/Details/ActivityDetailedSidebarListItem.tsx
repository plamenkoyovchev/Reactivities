import React from "react";

import { IAttendee } from "../../../app/Models/Attendee/IAttendee";
import { Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ActivityDetailedSidebarListItem: React.FC<{ attendee: IAttendee }> = ({
  attendee,
}) => {
  const { isHost, image, username, displayName, following } = attendee;
  return (
    <Item style={{ position: "relative" }}>
      {isHost && (
        <Label style={{ position: "absolute" }} color="orange" ribbon="right">
          Host
        </Label>
      )}
      <Image size="tiny" src={image || "/assets/user.png"} />
      <Item.Content verticalAlign="middle">
        <Item.Header as="h3">
          <Link to={`/profile/${username}`}>{displayName}</Link>
        </Item.Header>
        {following && (
          <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
};

export default ActivityDetailedSidebarListItem;
