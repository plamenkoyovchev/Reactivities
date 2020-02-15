import React from "react";
import "./App.scss";
import Navigation from "../components/Navigation/Navigation";

import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../components/Activities/Dashboard/ActivityDashboard";
import {
  Route,
  RouteComponentProps,
  withRouter,
  Switch
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import ActivityForm from "../components/Activities/Form/ActivityForm";
import ActivityDetails from "../components/Activities/Details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Navigation />
      <Container className="Container">
        <ToastContainer position="bottom-right" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/activities" component={ActivityDashboard} />
          <Route path="/activities/:id" component={ActivityDetails} />
          <Route
            key={location.key}
            path={["/createActivity", "/editActivity/:id"]}
            component={ActivityForm}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
};

export default withRouter(App);
