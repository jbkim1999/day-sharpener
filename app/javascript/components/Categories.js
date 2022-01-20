import React, { useState, useEffect } from 'react';
import '../../assets/stylesheets/Categories.css';

const Categories = (props) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusCheck, setStatusCheck] = useState("");
  let completedCategoryId;

  const fetchTasks = async () => {
    const response = await fetch("/api/v1/tasks.json");
    const tasksData = await response.json();
    setTasks(tasksData);
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/v1/categories.json");
    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  useEffect(() => {
    if (statusCheck !== props.status) {
      fetchCategories();
      fetchTasks();
      setStatusCheck(props.status);
    }
  }); // VERY IMPORTANT!

  const handleCreateCategory = () => {
    props.switchWindow("CreateCategory");
  };
  
  const deleteCategory = (event) => {
    fetch(`/api/v1/categories/${event.target.value}`, { method: 'DELETE' });
    window.location.reload(); // refresh without changing the window
  };

  const switchCategoryTask = (categoryId, categoryName) => {
    props.switchCategoryTask({categoryId: categoryId, categoryName: categoryName});
  };

  return (
    <div className="categories-container">
      <h3>Task Category</h3>
      <div className="category-container">
        {categories.map(category => {
          let tasksNumber = tasks.filter(task => task.category_id === category.id).length;
          if (category.name === "Default") {
            return (
            <div key={category.id} className="category-buttons">
              <button className="category-button" onClick={() => switchCategoryTask(category.id, category.name)}>
                {category.name}: {tasksNumber}
              </button>
            </div>
            );
          }
          else if (category.name !== "Completed") {
            return (
              <div key={category.id} className="category-buttons">
                <button key={category.id} className="category-button" onClick={() => switchCategoryTask(category.id, category.name)}>
                  {category.name}: {tasksNumber}
                </button>
                <button className="category-delete-button" onClick={deleteCategory} value={category.id}>
                  X
                </button>
              </div>
            );
          }
          else if (category.name === "Completed") {
            completedCategoryId = category.id;
          }
        })}
        <button className="completed-tasks-button" onClick={() => switchCategoryTask(completedCategoryId, "Completed")}>View completed tasks</button>
        <button className="create-category-button" onClick={handleCreateCategory}>Create new category</button>
      </div>
    </div>
  );
};

export default Categories;