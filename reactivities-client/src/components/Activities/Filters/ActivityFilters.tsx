import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  return (
    <>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item color={"blue"} name={"all"} content={"All Activities"} />
        <Menu.Item color={"blue"} name={"username"} content={"I'm Going"} />
        <Menu.Item color={"blue"} name={"host"} content={"I'm hosting"} />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
    </>
  );
};

export default observer(ActivityFilters);
