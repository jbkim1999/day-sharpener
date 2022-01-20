import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../../stylesheets/Window.css';

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

  const completeTask = (event) => {
    fetch(`/api/v1/tasks/${event.target.value}/complete`, { method: 'GET' });
    window.location.reload();
  };

  const deleteTask = (event) => {
    fetch(`/api/v1/tasks/${event.target.value}`, { method: 'DELETE' });
    window.location.reload(); // refresh without changing the window
  };

  const editTask = (event) => {
    props.editTask(event.target.value);
  };

  return (
    <div className="window-container">
      <h1>Today is {moment().format("MMMM Do, YYYY.")}</h1>
      <h2>Here are your tasks that you need to sharpen by today.</h2>
      <table>
        <thead>
          <tr>
            <th className="table-button-header"></th>
            <th className="category-heading">Category</th>
            <th className="description-heading">Description</th>
            <th className="table-button-header"></th>
            <th className="table-button-header"></th>
          </tr>
        </thead>
      {tasks.map(task => {
        const categoryId = task.category_id;
        const categoryFound = categories.filter(category => category.id === categoryId)[0];
        let categoryName;
        if (categoryFound) {
          categoryName = categoryFound.name;
        }
        if (moment().format("YYYY-MM-DD") === task.due_date && categoryName !== "Completed") {
          return (
            <tbody key={task.id}>
              <tr>
                <td><button onClick={completeTask} value={task.id}>Complete Task</button></td>
                <td>{categoryName}</td>
                <td>{task.description}</td>
                <td><button onClick={editTask} value={task.id}>Edit Task</button></td>
                <td><button onClick={deleteTask} value={task.id}>Delete Task</button></td>
              </tr>
            </tbody>
          );
        }
      })}
      </table>
    </div>
  );
};

export default TodayTask;