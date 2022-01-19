import React, { useState, useEffect } from 'react';

const CategoryTask = (props) => {
  const [tasks, setTasks] = useState([]);
  const categoryId = props.categoryInfo.categoryId;
  const categoryName = props.categoryInfo.categoryName;

  const fetchTasks = async () => {
    const response = await fetch("/api/v1/tasks.json");
    const tasksData = await response.json();
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchTasks();
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
    console.log(event.target.value);
  };

  const switchWindow = () => {
    props.switchWindow("TodayTask");
  }

  if (categoryName !== "Completed") {
    return (
      <div className="window-container">
        <h1>Tasks to be sharpened under {categoryName}.</h1>
        <table>
          <thead>
            <tr>
              <th className="table-button-header"></th>
              <th className="description-heading">Description</th>
              <th className="date-heading">Due Date</th>
              <th className="table-button-header"></th>
              <th className="table-button-header"></th>
            </tr>
          </thead>
          {tasks.map(task => {
            if (task.category_id === categoryId) {
              return (
                <tbody key={task.id}>
                <tr>
                  <td><button onClick={completeTask} value={task.id}>Complete Task</button></td>
                  <td>{task.description}</td>
                  <td>{task.due_date}</td>
                  <td><button onClick={editTask}>Edit Task</button></td>
                  <td><button onClick={deleteTask} value={task.id}>Delete Task</button></td>
                </tr>
              </tbody>
              );
            }
          })}
        </table>
        <br/>
        <p onClick={switchWindow} className="return-today">Return to Today</p>
      </div>
    );
  } else {
    return (
      <div className="window-container">
        <h1>Here are tasks that you have already sharpened so far, just for the record.</h1>
        <table>
          <thead>
            <tr>
              <th className="completed-description-heading">Description</th>
              <th className="completed-date-heading">Done on</th>
            </tr>
          </thead>
          {tasks.map(task => {
            if (task.category_id === categoryId) {
              return (
                <tbody key={task.id}>
                <tr>
                  <td>{task.description}</td>
                  <td>{task.due_date}</td>
                </tr>
              </tbody>
              );
            }
          })}
        </table>
        <br/>
        <p onClick={switchWindow} className="return-today">Return to Today</p>
      </div>
    )
  }
};

export default CategoryTask;