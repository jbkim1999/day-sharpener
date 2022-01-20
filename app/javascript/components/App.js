import React, { useState } from 'react';
import '../../assets/stylesheets/App.css';

import Header from './Header.js';
import Categories from './Categories.js';
import Windows from './Windows.js';
import Footer from './Footer.js';

const App = () => {
  const [status, setStatus] = useState("TodayTask");
  const [categoryInfo, setCategoryInfo] = useState({categoryId: 0, categoryName: ""});

  const switchWindow = (statusTo) => {
    setStatus(statusTo);
  }

  const switchCategoryTask = (categoryObj) => {
    setCategoryInfo(categoryObj);
    setStatus("CategoryTask");
  }

  return (
    <div className="container">
      <Header switchWindow={switchWindow} />
      <Categories status={status} switchWindow={switchWindow} switchCategoryTask={switchCategoryTask} />
      <Windows status={status} switchWindow={switchWindow} categoryInfo={categoryInfo} />
      <Footer />
    </div>
  );
};

export default App;