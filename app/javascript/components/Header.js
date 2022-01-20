import React, { useState, useEffect } from 'react';
import '../../assets/stylesheets/Header.css';

const Header = (props) => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const response = await fetch("/api/v1/users.json");
    const userData = await response.json();
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const switchWindow = () => {
    props.switchWindow("CreateTask");
  }

  return (
    <div className="header-container">
      <h1 className="welcome-message">Your schedule is looking sharpy, {user.username}.</h1>
      <a onClick={switchWindow} className="create-task-button">Create Task</a>
    </div>
  );
};

export default Header;