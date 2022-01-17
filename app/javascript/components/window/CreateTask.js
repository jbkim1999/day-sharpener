import React, { useState, useEffect } from 'react'
import './Window.css';

const CreateTask = (props) => {
  const [categories, setCategories] = useState([]);
  const [taskParams, setTaskParams] = useState({ category_id: "", description: "", due_date: ""});
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    const response = await fetch("/api/v1/categories.json");
    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  useEffect(() => {
      fetchCategories();
  }, []);

  const handleChange = (event) => {
    // setCategoryParams(Object.assign({}, categoryParams, {[event.target.name]: event.target.value}));
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
      setTaskParams({ category_id: "", description: "", due_date: ""});
      setError('');
    })
    .catch((response) => {
      let error;
      switch (response.message) {
        case "Request failed with status code 401":
          error = 'Please log in to leave a review.';
          break;
        default:
          error = 'Something went wrong.';
      };
      setError(error);
    })
    .finally(() => {
      props.switchWindow("TodayTask");
    }); // VERY IMPORTANT
  }

  return (
    <div className="window-container">
      <h1>Which task do you wish to sharpen?</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={taskParams.name} type="text" name="description" />
        <button type="submit">Sharpen this!</button>
        {
          error && 
          <Error>{error}</Error>
        }
      </form>
    </div>
  )
};

export default CreateTask;