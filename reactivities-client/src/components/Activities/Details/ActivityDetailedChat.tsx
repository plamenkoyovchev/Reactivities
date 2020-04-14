import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";

import ActivityDetailedChatItem from "./ActivityDetailedChatItem";
import { RootStoreContext } from "../../../shared/stores/rootStore";

import { Form as FinalForm, Field } from "react-final-form";
import { observer } from "mobx-react-lite";

const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
  } = rootStore.activityStore;

  useEffect(() => {
    createHubConnection(activity!.id);

    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

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
            comments.map((comment) => (
              <ActivityDetailedChatItem key={comment.id} comment={comment} />
            ))}

          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()?.then(() => form.reset())}>
                <Field
                  name="body"
                  rows={2}
                  placeholder="Add comment"
                  component="textarea"
                />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
