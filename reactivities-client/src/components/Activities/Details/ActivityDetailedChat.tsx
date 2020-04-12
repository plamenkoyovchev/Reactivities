import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";

import ActivityDetailedChatItem from "./ActivityDetailedChatItem";
import { IComment } from "../../../app/Models/Comment/IComment";
import { RootStoreContext } from "../../../shared/stores/rootStore";

const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
  } = rootStore.activityStore;

  useEffect(() => {
    createHubConnection();

    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection]);

  const { comments } = activity!;

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {comments &&
            comments.map((comment) => {
              <ActivityDetailedChatItem key={comment.id} comment={comment} />;
            })}
          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default ActivityDetailedChat;
