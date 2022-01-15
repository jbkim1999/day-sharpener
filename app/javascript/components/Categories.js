import React, { useState, useEffect } from 'react'

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
    <div>
      <h3>Task Category</h3>
      <ul>
        {categories.map(category => {
          return (
            <li key={category.id}>
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;