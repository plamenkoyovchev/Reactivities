import React from "react";
import "./Navigation.scss";

import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="Navigation">
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img className="Logo" src="/assets/logo.png" alt="logo" />
            Reactivities
          </Menu.Item>
          <Menu.Item
            name="Activities"
            as={NavLink}
            to="/activities"
          ></Menu.Item>
          <Menu.Item>
            <Button
              as={Link}
              to="/createActivity"
              positive
              content="Create Activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Navigation;
