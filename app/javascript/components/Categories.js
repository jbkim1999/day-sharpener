import React, { useState, useEffect } from 'react'
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("/api/v1/categories.json");
    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <h3>Task Category</h3>
      <ul>
        {categories.map(category => {
          return (
            <div className="categories">
              <li key={category.id}>
                {category.name}
              </li>
              <button>X</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;