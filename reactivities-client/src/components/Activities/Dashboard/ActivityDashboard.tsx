import React, { useEffect, useContext, useState } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../shared/stores/rootStore";

import { Grid, Button } from "semantic-ui-react";
import ActivityList from "../List/ActivityList";

import Loader from "../../UI/Loader/Loader";

const ActivityDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loading,
    page,
    setPage,
    totalPages,
  } = rootStore.activityStore;
  const [fetchingNext, setFetchingNext] = useState(false);

  const onFetchNextHandler = () => {
    setFetchingNext(true);
    setPage(page + 1);
    loadActivities().finally(() => setFetchingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading && page === 0) {
    return <Loader />;
  }

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <ActivityList />
            <Button
              loading={fetchingNext}
              positive
              content="More"
              floated="right"
              disabled={totalPages === page + 1}
              onClick={onFetchNextHandler}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Activity Filters</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default observer(ActivityDashboard);
