import React from 'react'
import './App.css';

import Header from './Header.js';
import Categories from './Categories.js';
import Window from './Window.js';

const App = () => {
  return (
    <div className="container">
      <Header className="header"/>
      <Categories className="categories"/>
      <Window className="window"/>
    </div>
  );
};

export default App;