import React from "react";
import "./Loader.scss";

interface IProps {
  loadingText?: string;
}

const Loader: React.FC<IProps> = props => {
  const { loadingText } = props;
  return (
    <>
      <div className="loader"></div>
      <h2 className="loader-text">{loadingText}</h2>
    </>
  );
};

export default Loader;
