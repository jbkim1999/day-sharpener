import React from 'react'
import './Windows.css'

import TodayTask from "./window/TodayTask.js";
import CreateCategory from "./window/CreateCategory.js";
import CreateTask from "./window/CreateTask.js";

const Windows = (props) => {
  const switchWindow = (statusTo) => {
    props.switchWindow(statusTo);
  }

  {switch (props.status) {
    case "TodayTask":
      return <div className="windows-container"><TodayTask /></div>;
    case "CreateCategory":
      return <div className="windows-container"><CreateCategory switchWindow={switchWindow}/></div>;
    case "CreateTask":
      return <div className="windows-container"><CreateTask /></div>;
  }}
};

export default Windows;