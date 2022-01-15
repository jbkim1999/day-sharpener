import React from 'react'
import './App.css';

import Header from './Header.js';
import Categories from './Categories.js';
import Window from './Window.js';
import Footer from './Footer.js';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Categories />
      <Window />
      <Footer />
    </div>
  );
};

export default App;