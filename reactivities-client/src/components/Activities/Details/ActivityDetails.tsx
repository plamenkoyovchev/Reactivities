import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";

import ActivityStore from "../../../shared/stores/activity/activityStore";

import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";

import Loader from "../../UI/Loader/Loader";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loading } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loading || !activity) {
    return <Loader />;
  }

  const cancelHandler = () => {
    history.push("/activities");
  };

  const { id, title, date, description, category } = activity!;
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
            as={Link}
            to={`/editActivity/${id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button onClick={cancelHandler} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
