import React, { useContext } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { filter, setFilter } = rootStore.activityStore;

  return (
    <>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={filter.size === 0}
          onClick={() => setFilter("all", true)}
          color={"blue"}
          name={"all"}
          content={"All Events"}
        />
        <Menu.Item
          active={filter.has("isGoing")}
          onClick={() => setFilter("isGoing", true)}
          color={"blue"}
          name={"username"}
          content={"I'm Going"}
        />
        <Menu.Item
          active={filter.has("isHost")}
          onClick={() => setFilter("isHost", true)}
          color={"blue"}
          name={"host"}
          content={"I'm hosting"}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
      <Calendar
        onChange={(date) => setFilter("startDate", date!)}
        value={filter.get("startDate") || new Date()}
      />
    </>
  );
};

export default observer(ActivityFilters);
