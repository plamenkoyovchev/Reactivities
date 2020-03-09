import React, { useContext } from "react";
import "./Navigation.scss";

import RootStore from "../../shared/stores/rootStore";

import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  const rootStore = useContext(RootStore);
  const { loggedIn, currentUser } = rootStore.userStore;
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
          {loggedIn && currentUser && (
            <Menu.Item position="right">
              <Image
                avatar
                spaced="right"
                src={currentUser.image || "/assets/user.png"}
              />
              <Dropdown pointing="top left" text={currentUser.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    text="My proflie"
                    icon="user"
                  />
                  <Dropdown.Item text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};

export default Navigation;
