import React, { useContext } from "react";

import { Form as FinalForm, Field } from "react-final-form";
import { IUserFormValues } from "../../app/Models/User/IUserFormValues";
import { RootStoreContext } from "../../shared/stores/rootStore";
import { FORM_ERROR } from "final-form";
import { isRequired, combineValidators } from "revalidate";
import { Form, Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ErrorMessage from "../Common/ErrorMessage";
import TextInput from "../UI/Form/TextInput";

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const { close } = rootStore.modalStore;

  return (
    <FinalForm
      onSubmit={(value: IUserFormValues) =>
        register(value)
          .then(close)
          .catch((error) => ({ [FORM_ERROR]: error }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header as="h2" content="Register for Eventy" textAlign="center" />
          <Field name="email" placeholder="Email" component={TextInput} />
          <Field name="username" placeholder="Username" component={TextInput} />
          <Field
            name="displayName"
            placeholder="Display Name"
            component={TextInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            component={TextInput}
          />
          <Button
            positive
            content="Register"
            loading={submitting}
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            fluid
          />
          <br />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
        </Form>
      )}
    />
  );
};

export default observer(RegisterForm);
