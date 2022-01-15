import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const response = await fetch("/api/v1/users.json");
    const userData = await response.json();
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="header-container">
      <h1 className="welcome-message">Schedule is being sharpened, {user.username}.</h1>
      <a href="/users/sign_out" data-method="delete" rel="nofollow" className="button" >Sign Out</a>
    </div>
  );
};

export default Header;