import React from "react";

const RIcon = ({ name }) => {
  return (
    <svg className="icon custom-svg" aria-hidden="true">
      <use xlinkHref={`#${name}`}></use>
    </svg>
  );
};

export default RIcon;
