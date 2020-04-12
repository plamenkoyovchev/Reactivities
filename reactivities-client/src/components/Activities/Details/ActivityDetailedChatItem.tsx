import React from "react";

import { IComment } from "../../../app/Models/Comment/IComment";
import { Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  comment: IComment;
}

const ActivityDetailedChatItem: React.FC<IProps> = ({ comment }) => {
  const { username, displayName, image, body, createdAt } = comment;

  return (
    <Comment>
      <Comment.Avatar src={`${image} || "/assets/user.png"`} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/profile/${username}`}>
          {displayName}
        </Comment.Author>
        <Comment.Metadata>
          <div>{createdAt}</div>
        </Comment.Metadata>
        <Comment.Text>{body}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default ActivityDetailedChatItem;
