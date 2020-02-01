import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container>
      <h1>Home Page</h1>
      <h3>
        Go to <Link to="/activities">Activities</Link>
      </h3>
    </Container>
  );
}

export default HomePage;
