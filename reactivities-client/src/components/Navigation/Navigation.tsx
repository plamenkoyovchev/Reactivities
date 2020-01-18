import React, { Fragment } from "react";
import "./Navigation.scss";

import { Menu, Container, Button } from "semantic-ui-react";

const Navigation = () => {
  return (
    <div className="Navigation">
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img className="Logo" src="/assets/logo.png" alt="logo" />
            Reactivities
          </Menu.Item>
          <Menu.Item name="Activities"></Menu.Item>
          <Menu.Item name="friends">
            <Button positive content="Create Activity"></Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Navigation;
