import React, { useContext } from "react";
import "./HomePage.scss";

import { RootStoreContext } from "../shared/stores/rootStore";

import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../components/User/LoginForm";

function HomePage() {
  const rootStore = useContext(RootStoreContext);
  const { loggedIn, currentUser } = rootStore.userStore;
  const { open } = rootStore.modalStore;

  const actionButtons =
    loggedIn && currentUser ? (
      <Button as={Link} to="/activities" size="huge" inverted>
        Go to activities
      </Button>
    ) : (
      <>
        <Button onClick={() => open(<LoginForm />)} size="huge" inverted>
          Login
        </Button>
        <Button as={Link} to="/register" size="huge" inverted>
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
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome to Reactivities" />
        {actionButtons}
      </Container>
    </Segment>
  );
}

export default HomePage;
