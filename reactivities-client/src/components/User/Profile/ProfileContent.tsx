import React from "react";
import { Tab } from "semantic-ui-react";

import ProfilePhotos from "../Profile/ProfilePhotos";

import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";
import ProfileAbout from "./ProfileAbout";

const panes = [
  { menuItem: "About", render: () => <ProfileAbout /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  { menuItem: "Events", render: () => <ProfileActivities /> },
  {
    menuItem: "Followers",
    render: () => <ProfileFollowings />,
  },
  {
    menuItem: "Followings",
    render: () => <ProfileFollowings />,
  },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
