import React, { useState, useEffect } from 'react';
import '../../../assets/stylesheets/Window.css';
import moment from 'moment';

const CreateTask = (props) => {
  const [categories, setCategories] = useState([]); // For drop-down
  const [taskParams, setTaskParams] = useState({ category_id: "", description: "", due_date: moment().format("YYYY-MM-DD")});
  // const [error, setError] = useState('');
  let defaultId; // For Default selection

  const fetchCategories = async () => {
    const response = await fetch("/api/v1/categories.json");
    const categoriesData = await response.json();
    categoriesData.forEach(categoryData => {
      if (categoryData.name === "Default") {
        defaultId = categoryData.id;
      }
    })
    setTaskParams(Object.assign({}, taskParams, {category_id: defaultId}));
    setCategories(categoriesData);
  };

  useEffect(() => {
      fetchCategories();
  }, []);

  const handleChange = (event) => {
    setTaskParams(Object.assign({}, taskParams, {[event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/v1/tasks", { 
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(taskParams), // body data type must match "Content-Type" header
    })
    .then(() => {
      setTaskParams({ category: "Default", description: "", due_date: moment().format("YYYY-MM-DD")});
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
      <h1>Which task do you wish to sharpen?</h1>
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

        <button type="submit" className="submit-button">Sharpen this!</button>
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

export default CreateTask;