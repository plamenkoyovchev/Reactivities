import React, { useContext } from "react";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { Tab, Header, Card, Image } from "semantic-ui-react";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile } = rootStore.profileStore;

  return (
    <Tab.Pane>
      <Header icon="image" content="Photos" />
      <Card.Group itemsPerRow={5}>
        {profile &&
          profile.photos.map(({ id, url }) => (
            <Card key={id}>
              <Image src={url} />
            </Card>
          ))}
      </Card.Group>
    </Tab.Pane>
  );
};

export default ProfilePhotos;
