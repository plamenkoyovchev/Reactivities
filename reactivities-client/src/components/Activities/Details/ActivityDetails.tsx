import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/Models/Activity/IActivity";

import ActivityStore from "../../../shared/stores/activity/activityStore";

interface IProps {
  selectedActivity: IActivity;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDetails: React.FC<IProps> = ({ setEditMode }) => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, deselectActivity } = activityStore;
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

export default ActivityDetails;
