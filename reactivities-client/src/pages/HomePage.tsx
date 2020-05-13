import React, { useContext } from "react";
import "./HomePage.scss";

import { RootStoreContext } from "../shared/stores/rootStore";

import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../components/User/LoginForm";
import RegisterForm from "../components/User/RegisterForm";

function HomePage() {
  const token = localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { loggedIn, currentUser } = rootStore.userStore;
  const { open } = rootStore.modalStore;

  const actionButtons =
    loggedIn && currentUser && token ? (
      <Button as={Link} to="/activities" size="huge" inverted>
        Go to events
      </Button>
    ) : (
      <>
        <Button onClick={() => open(<LoginForm />)} size="huge" inverted>
          Login
        </Button>
        <Button onClick={() => open(<RegisterForm />)} size="huge" inverted>
          Register
        </Button>
      </>
    );

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Eventy
        </Header>
        <Header
          as="h2"
          inverted
          content={
            loggedIn
              ? `Welcome ${currentUser?.displayName}`
              : "Welcome to Eventy"
          }
        />
        {actionButtons}
      </Container>
    </Segment>
  );
}

export default HomePage;
