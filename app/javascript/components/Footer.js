import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="intro">
        Made by JB Kim. Check out my <a href="https://github.com/jbkim1999/day-sharpener">Github page</a>!
        <a href="/users/sign_out" data-method="delete" rel="nofollow" className="sign-out">Sign Out</a>
      </div>
    </div>
  );
};

export default Footer;