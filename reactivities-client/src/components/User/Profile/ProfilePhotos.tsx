import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { Tab, Header, Card, Image, Grid, Button } from "semantic-ui-react";

import PhotoUploadWidget from "../../Common/Photos/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loading,
  } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

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
            <PhotoUploadWidget
              loading={uploadingPhoto}
              uploadPhoto={handleUploadImage}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group>
                        <Button
                          name={`${photo.id}_main`}
                          disabled={photo.isMain}
                          basic
                          positive
                          content="Main"
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          loading={loading && target === `${photo.id}_main`}
                        />
                        <Button
                          name={`${photo.id}_delete`}
                          disabled={photo.isMain}
                          basic
                          negative
                          icon="trash"
                          onClick={(e) => {
                            deletePhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          loading={loading && target === `${photo.id}_delete`}
                        />
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

export default observer(ProfilePhotos);
