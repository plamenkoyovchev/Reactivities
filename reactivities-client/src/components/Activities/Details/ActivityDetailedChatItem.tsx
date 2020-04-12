import React from "react";

import { IComment } from "../../../app/Models/Comment/IComment";
import { Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  comment: IComment;
}

const ActivityDetailedChatItem: React.FC<IProps> = ({ comment }) => {
  const { username, displayName, photo, body, createdOn } = comment;

  return (
    <Comment>
      <Comment.Avatar src={photo || "/assets/user.png"} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/profile/${username}`}>
          {displayName}
        </Comment.Author>
        <Comment.Metadata>{createdOn}</Comment.Metadata>
        <Comment.Text>{body || "Empty"}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default ActivityDetailedChatItem;
