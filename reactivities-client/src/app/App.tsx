import React from "react";
import "./App.scss";
import Navigation from "../components/Navigation/Navigation";

import { Container } from "semantic-ui-react";
import ActivityDashboard from "../components/Activities/Dashboard/ActivityDashboard";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Container className="Container">
        <ActivityDashboard />
      </Container>
    </div>
  );
};

export default App;
