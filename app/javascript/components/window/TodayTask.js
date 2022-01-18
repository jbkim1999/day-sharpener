import React, { useState, useEffect } from 'react';
import moment from 'moment';

const TodayTask = (props) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

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
    fetchTasks()
    .then(() => fetchCategories());
  }, []);

  return (
    <div className="window-container">
      <h1>Today is {moment().format("MMMM Do, YYYY.")}</h1>
      <h2>Here are your tasks you may want to look at.</h2>
      <ul>
      {tasks.map(task => {
        const categoryId = task.category_id;
        const categoryFound = categories.filter(category => category.id === categoryId)[0];
        let categoryName;
        if (categoryFound) {
          categoryName = categoryFound.name;
        }
        return (
          <li className="task">
            {categoryName}, {task.description}, {task.due_date}
          </li>
        )
      })}
      </ul>
    </div>
  );
};

export default TodayTask;