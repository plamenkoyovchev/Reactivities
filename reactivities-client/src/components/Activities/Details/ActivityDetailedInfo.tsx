import React from "react";
import { IActivity } from "../../../app/Models/Activity/IActivity";
import { Segment, Grid, Icon } from "semantic-ui-react";

import { formatDate } from "../../../shared/utils/date-utils";

const ActivityDetailedInfo: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {formatDate(activity.date, "eeee do MMMM")} at{" "}
              {formatDate(activity.date, "HH:mm")}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {activity.venue} {activity.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailedInfo;
