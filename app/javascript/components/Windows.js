import React from 'react';
import './Windows.css';

import CategoryTask from "./window/CategoryTask.js";
import CreateCategory from "./window/CreateCategory.js";
import CreateTask from "./window/CreateTask.js";
import DateTask from "./window/DateTask.js";
import EditTask from "./window/EditTask.js";
import TodayTask from "./window/TodayTask.js";

const Windows = (props) => {
  const switchWindow = (statusTo) => {
    props.switchWindow(statusTo);
  }

  {switch (props.status) {
    case "CategoryTask":
      return <div className="windows-container"><CategoryTask switchWindow={switchWindow} categoryInfo={props.categoryInfo} /></div>;
    case "CreateCategory":
      return <div className="windows-container"><CreateCategory switchWindow={switchWindow} /></div>;
    case "CreateTask":
      return <div className="windows-container"><CreateTask switchWindow={switchWindow} /></div>;
    case "DateTask":
      return <div className="windows-container"><DateTask switchWindow={switchWindow} /></div>;
    case "EditTask":
      return <div className="windows-container"><EditTask switchWindow={switchWindow} /></div>;
    case "TodayTask":
      return <div className="windows-container"><TodayTask /></div>;
  }}
};

export default Windows;