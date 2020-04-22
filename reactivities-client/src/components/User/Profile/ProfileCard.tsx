import React from "react";
import { IProfile } from "../../../app/Models/Profile/IProfile";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  profile: IProfile;
  followers: boolean;
}

const ProfileCard: React.FC<IProps> = ({ profile, followers }) => {
  const {
    username,
    displayName,
    photo,
    followersCount,
    followingsCount,
  } = profile;
  return (
    <Card as={Link} to={`/profile/${username}`}>
      <Image src={photo?.url || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name="user" />
          {followers
            ? `${followersCount} Followers`
            : `${followingsCount} Followings`}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
