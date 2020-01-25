import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { observer } from "mobx-react-lite";

const ActivityDetails = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, deselectActivity, setEditMode } = activityStore;
  const { title, date, description, category } = selectedActivity!;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">{date}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={deselectActivity}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
