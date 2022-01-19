import React, { useState } from 'react';
import './Window.css';

// Error handling from Rails validation needed in the future

const CreateCategory = (props) => {
  const [categoryParams, setCategoryParams] = useState({ name: "" });
  // const [error, setError] = useState('');

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
      <h1>Create a category to organize your tasks.</h1>
      <p>
        Kindly note that your category name must be <strong>unique</strong>.
        <br/>
        Moreover, you can't name your category "Default" or "Completed," as they are pre-made.
      </p>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="field">
          <label htmlFor="name">Name for a new category: </label>
          <input onChange={handleChange} value={categoryParams.name} type="text" name="name" id="name"/>
        </div>

        <button type="submit" className="submit-button">Create Category</button>
        {/* { 
          error && 
          <div>
            {error}
          </div>
        } */}
      </form>
      <br/>
      <p onClick={switchWindow} className="return-today">Return to Today</p>
    </div>
  )
};

export default CreateCategory;