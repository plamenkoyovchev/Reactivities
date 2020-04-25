import React, { useState, useContext, useEffect } from "react";
import "./ActivityForm.scss";
import { Segment, Button, Grid, Form } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";

import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../../shared/stores/rootStore";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import TextInput from "../../UI/Form/TextInput";
import TextAreaInput from "../../UI/Form/TextAreaInput";

import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    activity: initialFormActivity,
    loading,
    loadActivity,
    cleanActivity,
    saveActivity,
    submitting,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
    isGoing: false,
    isHosting: false,
    attendees: [],
    comments: [],
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
    cleanActivity,
  ]);

  const validate = combineValidators({
    title: isRequired({ message: "The event title is required" }),
    category: isRequired("Category"),
    description: composeValidators(
      isRequired("Description"),
      hasLengthGreaterThan(4)({
        message: "Description needs to be at least 5 characters",
      })
    )(),
    city: isRequired("City"),
    venue: isRequired("Venue"),
    date: isRequired("Date"),
    time: isRequired("Time"),
  });

  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const submitHandler = () => {
    const activityToSave = {
      ...activity,
    };

    saveActivity(activityToSave).then(() => {
      history.push(`/activities/${activityToSave.id}`);
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={submitHandler}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  component={TextInput}
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={TextInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                  />
                  <Field
                    component={TextInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={activity.city}
                />
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
