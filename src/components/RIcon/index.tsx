import React from "react";

/** 自定义的菜单 icon  */
const RIcon = ({ name }) => {
  return (
    <svg className="icon custom-svg" aria-hidden="true">
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
};

export default RIcon;
