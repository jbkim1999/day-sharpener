import React, { useState, useEffect } from 'react';
import './Window.css';

// Edit form on Rails? 
const EditTask = (props) => {
  const [categories, setCategories] = useState([]); // for drop-down
  const [taskParams, setTaskParams] = useState({ category_id: "", description: "", due_date: ""});

  const fetchCategories = async () => {
    const response = await fetch("/api/v1/categories.json");
    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  const fetchTask = async () => {
    const response = await fetch(`/api/v1/tasks/${props.taskId}.json`);
    const taskData = await response.json();
    setTaskParams(taskData);
  }

  useEffect(() => {
    fetchTask();
    fetchCategories();
  }, []);

  // Syntax for Object.assign
  const handleChange = (event) => {
    setTaskParams(Object.assign({}, taskParams, {[event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/v1/tasks/${props.taskId}`, { 
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, cors, *same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: { // Only headers required!
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      }, 
      // redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(taskParams), // body data type must match "Content-Type" header
    })
    .then(() => {
      setTaskParams({ category_id: "", description: "", due_date: ""});
      // setError('');
    })
    // .catch((response) => {
    //   let error;
    //   switch (response.message) {
    //     case "Request failed with status code 401":
    //       error = 'Please log in to leave a review.';
    //       break;
    //     default:
    //       error = 'Something went wrong.';
    //   };
    //   console.log(error);
    //   setError(error);
    // })
    .finally(() => {
      props.switchWindow("TodayTask");
    }); // VERY IMPORTANT
  }

  const switchWindow = () => {
    props.switchWindow("TodayTask");
  }

  return (
    <div className="window-container">
      <h1>Edit your task to make it sharper.</h1>
      <form onSubmit={handleSubmit} className="form-container">

        <div className="field">
          <label htmlFor="category_id">Choose a category: </label>
          <select name="category_id" id="category_id" onChange={handleChange} value={taskParams.category_id}>
            {categories.map(category => {
                if (category.name !== "Completed") {
                  return (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  );
                }
            })}
          </select>
        </div>

        <div className="field">
          <label htmlFor="description">Description for the task: </label>
          <br />
          <textarea onChange={handleChange} value={taskParams.description} name="description" id="description"
            className="description-text" required/>
        </div>

        <div className="field">
          <label htmlFor="due_date">Due date for your task: </label>
          <input type="date" onChange={handleChange} value={taskParams.due_date} name="due_date" id="due_date" required/>
        </div>

        <button type="submit" className="submit-button">Edit like this!</button>
        {/* {
          error && 
          <div className="error">
            {error}
          </div>
        } */}
      </form>
      <br/>
      <p onClick={switchWindow} className="return-today">Return to Today</p>
    </div>
  );
};

export default EditTask;