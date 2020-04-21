import React from "react";
import {
  Segment,
  Grid,
  Item,
  Header,
  Statistic,
  Divider,
  Reveal,
  Button,
} from "semantic-ui-react";

import { IProfile } from "../../../app/Models/Profile/IProfile";
import { observer } from "mobx-react-lite";

interface IProps {
  profile: IProfile;
  follow: (username: string) => void;
  unfollow: (username: string) => void;
  isCurrentUser: boolean;
}

const ProfileHeader: React.FC<IProps> = ({
  profile,
  follow,
  unfollow,
  isCurrentUser,
}) => {
  const {
    photo,
    displayName,
    followersCount,
    followingsCount,
    following,
    username,
  } = profile;
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={photo?.url || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={followersCount} />
            <Statistic label="Following" value={followingsCount} />
          </Statistic.Group>
          <Divider />
          {!isCurrentUser && (
            <Reveal animated="move">
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button
                  fluid
                  color="teal"
                  content={following ? "Following" : "Not following"}
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  fluid
                  basic
                  color={following ? "red" : "green"}
                  content={following ? "Unfollow" : "Follow"}
                  onClick={() =>
                    following ? unfollow(username) : follow(username)
                  }
                />
              </Reveal.Content>
            </Reveal>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
