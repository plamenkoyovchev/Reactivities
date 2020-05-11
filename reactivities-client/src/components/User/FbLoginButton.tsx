import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps {
  fbCallback: (response: any) => void;
  loading: boolean;
}

const FbLoginButton: React.FC<IProps> = ({ fbCallback, loading }) => {
  return (
    <>
      <FacebookLogin
        appId="2744149992512877"
        fields="name,email,picture"
        callback={fbCallback}
        render={(renderProps: any) => (
          <Button
            onClick={renderProps.onClick}
            type="button"
            fluid
            color="facebook"
            loading={loading}
          >
            <Icon name="facebook" />
            Login with Facebook
          </Button>
        )}
      />
    </>
  );
};

export default observer(FbLoginButton);
