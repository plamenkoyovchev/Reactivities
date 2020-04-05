import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { Tab, Header, Card, Image, Grid, Button } from "semantic-ui-react";

import PhotoUploadWidget from "../../Common/Photos/PhotoUploadWidget";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile, isCurrentUser } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(({ id, url }) => (
                  <Card key={id}>
                    <Image src={url} />
                    {isCurrentUser && (
                      <Button.Group>
                        <Button basic positive content="Main" />
                        <Button basic negative icon="trash" />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfilePhotos;
