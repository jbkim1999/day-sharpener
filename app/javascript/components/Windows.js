import React, { useState } from 'react';
import '../../assets/stylesheets/Windows.css';

import CategoryTask from "./window/CategoryTask.js";
import CreateCategory from "./window/CreateCategory.js";
import CreateTask from "./window/CreateTask.js";
import DateTask from "./window/DateTask.js";
import EditTask from "./window/EditTask.js";
import TodayTask from "./window/TodayTask.js";

const Windows = (props) => {
  const [taskId, setTaskId] = useState(0);

  const switchWindow = (statusTo) => {
    props.switchWindow(statusTo);
  }

  const editTask = (taskId) => {
    setTaskId(taskId);
    props.switchWindow("EditTask");
  }

  {switch (props.status) {
    case "CategoryTask":
      return <div className="windows-container"><CategoryTask switchWindow={switchWindow} categoryInfo={props.categoryInfo} editTask={editTask} /></div>;
    case "CreateCategory":
      return <div className="windows-container"><CreateCategory switchWindow={switchWindow} /></div>;
    case "CreateTask":
      return <div className="windows-container"><CreateTask switchWindow={switchWindow} /></div>;
    case "DateTask":
      return <div className="windows-container"><DateTask switchWindow={switchWindow} /></div>;
    case "EditTask":
      return <div className="windows-container"><EditTask switchWindow={switchWindow} taskId={taskId} /></div>;
    case "TodayTask":
      return <div className="windows-container"><TodayTask editTask={editTask} /></div>;
  }}
};

export default Windows;