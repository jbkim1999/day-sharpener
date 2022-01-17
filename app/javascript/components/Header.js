import React, { useState, useEffect } from 'react';
import './Header.css';

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
      <h1 className="welcome-message">Schedule is being sharpened, {user.username}.</h1>
      <a onClick={switchWindow} className="button" >Create Task</a>
    </div>
  );
};

export default Header;