import React, { useState, useContext, useEffect } from "react";
import "./ActivityForm.scss";
import { Segment, Button, Grid, Form } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/Models/Activity/IActivity";

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
import SelectInput from "../../UI/Form/SelectInput";
import { categories } from "../../../shared/common/options/categoryOptions";
import DateInput from "../../UI/Form/DateInput";
import { combineDateAndTime } from "../../../shared/utils/date-utils";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loading,
    loadActivity,
    saveActivity,
    submitting,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
    }
  }, [match.params.id, loadActivity]);

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

  const submitHandler = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const {
      date,
      time,
      attendees,
      comments,
      isGoing,
      isHosting,
      ...activity
    } = values;
    activity.date = dateAndTime;

    saveActivity(activity).then(() =>
      history.push(`/activities/${activity.id}`)
    );
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
                  component={SelectInput}
                  options={categories}
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    value={activity.date}
                    placeholder="Date"
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    value={activity.time}
                    placeholder="Time"
                    dateFormat={"HH:mm"}
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
