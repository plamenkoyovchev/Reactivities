import React from "react";
import "./App.scss";
import Navigation from "../components/Navigation/Navigation";

import { Container } from "semantic-ui-react";
import ActivityDashboard from "../components/Activities/Dashboard/ActivityDashboard";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ActivityForm from "../components/Activities/Form/ActivityForm";
import ActivityDetails from "../components/Activities/Details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Navigation />
      <Container className="Container">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route
          key={location.key}
          path={["/createActivity", "/editActivity/:id"]}
          component={ActivityForm}
        />
      </Container>
    </>
  );
};

export default withRouter(App);
