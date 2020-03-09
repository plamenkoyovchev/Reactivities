import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";

import { RootStoreContext } from "../../shared/stores/rootStore";
import { IUserFormValues } from "../../app/Models/User/IUserFormValues";
import { Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login, submitting } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => login(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={submitting}>
          <Field name="email" placeholder="Email" component="input" />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            component="input"
          />
          <Button positive content="Login" loading={submitting} />
        </Form>
      )}
    />
  );
};

export default observer(LoginForm);
