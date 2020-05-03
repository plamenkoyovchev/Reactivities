import React, { useContext, useEffect } from "react";
import "./App.scss";
import Navigation from "../components/Navigation/Navigation";

import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../components/Activities/Dashboard/ActivityDashboard";
import {
  Route,
  RouteComponentProps,
  withRouter,
  Switch,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import ActivityForm from "../components/Activities/Form/ActivityForm";
import ActivityDetails from "../components/Activities/Details/ActivityDetails";
import ProfilePage from "../pages/ProfilePage";

import { RootStoreContext } from "../shared/stores/rootStore";

import { observer } from "mobx-react-lite";
import Loader from "../components/UI/Loader/Loader";
import AppModal from "../components/UI/Modal/AppModal";
import PrivateRoute from "./PrivateRoute";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { appLoaded, setAppLoaded, token } = rootStore.commonStore;
  const { getCurrentUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getCurrentUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getCurrentUser, setAppLoaded, token]);

  if (!appLoaded) {
    return <Loader loadingText="Application is loading ..." />;
  }

  return (
    <>
      <AppModal />
      <ToastContainer position="top-left" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navigation />
            <Container className="Container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/createActivity", "/editActivity/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  path="/profile/:username"
                  component={ProfilePage}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
