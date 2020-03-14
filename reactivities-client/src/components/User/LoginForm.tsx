import React, { useContext } from "react";

import { RootStoreContext } from "../../shared/stores/rootStore";
import { IUserFormValues } from "../../app/Models/User/IUserFormValues";
import { Form, Button, Label, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { FORM_ERROR } from "final-form";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../Common/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const { close } = rootStore.modalStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values)
          .then(close)
          .catch(error => ({
            [FORM_ERROR]: error
          }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header as="h2" content="Login for Reactivities" textAlign="center" />
          <Field name="email" placeholder="Email" component="input" />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            component="input"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <br />
          <Button
            positive
            content="Login"
            loading={submitting}
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            fluid
          />
        </Form>
      )}
    />
  );
};

export default observer(LoginForm);
