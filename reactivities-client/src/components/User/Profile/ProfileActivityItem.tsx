import React from "react";
import { IUserActivity } from "../../../app/Models/Profile/IUserActivity";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../shared/utils/date-utils";

interface IProps {
  activity: IUserActivity;
}

const ProfileActivityItem: React.FC<IProps> = ({ activity }) => {
  const { id, category, title, date } = activity;
  return (
    <Card as={Link} to={`/activities/${id}`} key={id}>
      <Image
        src={`/assets/categoryImages/${category}.jpg`}
        style={{ minHeight: 100, objectFit: "cover" }}
      />
      <Card.Content>
        <Card.Header textAlign="center">{title}</Card.Header>
        <Card.Meta textAlign="center">
          <div>{formatDate(new Date(date), "do LLL")}</div>
          <div>{formatDate(new Date(date), "h:mm a")}</div>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ProfileActivityItem;
