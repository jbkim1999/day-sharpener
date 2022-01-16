import React, { useState } from 'react'
import './Window.css';

const CreateCategory = (props) => {
  const [categoryParams, setCategoryParams] = useState({ name: "" });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCategoryParams(Object.assign({}, categoryParams, {[event.target.name]: event.target.value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/v1/categories", { 
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
      body: JSON.stringify(categoryParams), // body data type must match "Content-Type" header
    })
    .then(() => {
      setCategoryParams({ name: "" });
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
      <h1>Create a category to organize your tasks.</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={categoryParams.name} type="text" name="name" />
        <button type="submit">Create Category</button>
        { 
          error && 
          <Error>{error}</Error>
        }
      </form>
    </div>
  )
};

export default CreateCategory;