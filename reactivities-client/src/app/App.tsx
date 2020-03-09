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
import LoginForm from "../components/User/LoginForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navigation />
            <Container className="Container">
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/editActivity/:id"]}
                  component={ActivityForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(App);
