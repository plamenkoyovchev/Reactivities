import React, { useState, useContext, useEffect } from "react";
import "./ActivityForm.scss";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialFormActivity,
    loading,
    loadActivity,
    cleanActivity,
    saveActivity,
    submitting
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormActivity && setActivity(initialFormActivity)
      );
    }

    return () => {
      cleanActivity();
    };
  }, [
    match.params.id,
    activity.id.length,
    loadActivity,
    initialFormActivity,
    cleanActivity
  ]);

  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const submitHandler = () => {
    const activityToSave = {
      ...activity
    };

    saveActivity(activityToSave).then(() => {
      history.push(`/activities/${activityToSave.id}`);
    });
  };

  if (loading) {
    return <Loader />;
  }

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
          onClick={() => history.push(`/activities/${activity.id}`)}
          floated="left"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
