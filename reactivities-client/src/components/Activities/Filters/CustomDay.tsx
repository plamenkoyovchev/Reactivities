import React, { useContext } from "react";
import { RootStoreContext } from "../../../shared/stores/rootStore";
import { observer } from "mobx-react-lite";

import "./CustomDay.scss";

const CustomDay: React.FC<any> = ({ date, label }) => {
  const rootStore = useContext(RootStoreContext);
  const { activityDates } = rootStore.activityStore;
  const styleClass =
    activityDates && activityDates.includes(date.getTime()) ? "CustomDay" : "";

  return <div className={styleClass}>{label}</div>;
};

export default observer(CustomDay);
