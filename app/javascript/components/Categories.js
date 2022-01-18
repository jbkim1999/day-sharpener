import React, { useState, useEffect } from 'react';
import './Categories.css';

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [statusCheck, setStatusCheck] = useState("");

  const fetchCategories = async () => {
    const response = await fetch("/api/v1/categories.json");
    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  useEffect(() => {
    if (statusCheck !== props.status) {
      fetchCategories();
      setStatusCheck(props.status);
    }
  }); // VERY IMPORTANT!

  const handleCreateCategory = () => {
    props.switchWindow("CreateCategory");
  }
  
  const deleteCategory = (event) => {
    fetch(`/api/v1/categories/${event.target.value}`, { method: 'DELETE' });
    window.location.reload(); // refresh without changing the window
  }

  return (
    <div className="categories-container">
      <h3>Task Category</h3>
      <div className="category-container">
        {categories.map(category => {
          if (category.name === "Default") {
            return (
            <div key={category.id} className="category-buttons">
              <button className="category-button" value={category.name}>
                {category.name}
              </button>
            </div>
            );
          }
          else if (category.name !== "Completed") {
            return (
              <div key={category.id} className="category-buttons">
                <button key={category.id} className="category-button" value={category.name}>
                  {category.name}
                </button>
                <button className="category-delete-button" onClick={deleteCategory} value={category.id}>
                  X
                </button>
              </div>
            );
          }
        })}
        <button className="completed-tasks-button" value="Completed">View completed tasks</button>
        <button className="create-category-button" onClick={handleCreateCategory}>Create new category</button>
      </div>
    </div>
  );
};

export default Categories;