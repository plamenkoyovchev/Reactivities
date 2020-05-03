import React, { useEffect, useContext, useState } from "react";
import "./ActivityDashboard.scss";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../shared/stores/rootStore";

import { Grid, Loader as SemanticLoader } from "semantic-ui-react";
import ActivityList from "../List/ActivityList";

import Loader from "../../UI/Loader/Loader";
import InfiniteScroller from "react-infinite-scroller";
import ActivityFilters from "../Filters/ActivityFilters";
import ActivityListItemPlaceholder from "../List/ListItem/ActivityListItemPlaceholder";

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

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {loading && page === 0 ? (
              <ActivityListItemPlaceholder />
            ) : (
              <InfiniteScroller
                pageStart={0}
                loadMore={onFetchNextHandler}
                hasMore={!fetchingNext && page + 1 < totalPages}
                initialLoad={false}
              >
                <ActivityList />
              </InfiniteScroller>
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityFilters />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <SemanticLoader active={fetchingNext} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default observer(ActivityDashboard);
