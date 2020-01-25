import React, { useState, useContext } from "react";
import "./ActivityForm.scss";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { observer } from "mobx-react-lite";

const ActivityForm = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity,
    setEditMode,
    saveActivity,
    submitting
  } = activityStore;
  const initializeForm = () => {
    if (selectedActivity) {
      return selectedActivity;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const submitHandler = () => {
    const activityToSave = {
      ...activity
    };

    saveActivity(activityToSave);
  };

  return (
    <Segment clearing>
      <Form onSubmit={submitHandler} loading={submitting}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={inputChangeHandler}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={inputChangeHandler}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={inputChangeHandler}
        />
        <Button floated="left" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="left"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
