import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IUserActivity } from "../../../app/Models/Profile/IUserActivity";
import { format } from "date-fns";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { FilterType } from "../../../app/Models/Profile/FilterType";
import ProfileActivityItem from "./ProfileActivityItem";

const panes = [
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const ProfileActivities = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    profile,
    loadingActivities,
    activities,
  } = rootStore.profileStore!;

  useEffect(() => {
    loadActivities(profile!.username, FilterType.future);
  }, [loadActivities, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let filter;
    switch (data.activeIndex) {
      case 1:
        filter = FilterType.past;
        break;
      case 2:
        filter = FilterType.hosting;
        break;
      default:
        filter = FilterType.future;
        break;
    }
    loadActivities(profile!.username, filter);
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {activities.map((activity: IUserActivity) => (
              <ProfileActivityItem activity={activity} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileActivities);
