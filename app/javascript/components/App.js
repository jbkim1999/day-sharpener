import React, { useState } from 'react'
import './App.css';

import Header from './Header.js';
import Categories from './Categories.js';
import Windows from './Windows.js';
import Footer from './Footer.js';

const App = () => {
  const [status, setStatus] = useState("TodayTask");

  const switchWindow = (statusTo) => {
    setStatus(statusTo);
  }

  return (
    <div className="container">
      <Header />
      <Categories status={status} switchWindow={switchWindow} />
      <Windows status={status} switchWindow={switchWindow} />
      <Footer />
    </div>
  );
};

export default App;