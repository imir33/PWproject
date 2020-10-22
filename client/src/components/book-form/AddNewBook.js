import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connnect } from 'react-redux';

const AddNewBook = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    numOfPages: '',
    numOfCurrentPage: '',
    finished: false,
    rating: 0,
    numOfDays: '',
  });

  const [displayRating, toggleRating] = useState(false);

  const {
    title,
    author,
    numOfPages,
    numOfCurrentPage,
    finished,
    rating,
    numOfDays,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getFinishedValue = (e) => {
    setFormData({ ...formData, finished: displayRating });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add a New Book</h1>
      <small>* = required fields</small>

      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Book Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Book Author'
            name='author'
            value={author}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Number of Pages'
            name='numOfPages'
            value={numOfPages}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='my-2'>
          <button
            onClick={(e) => toggleRating(!displayRating)}
            type='button'
            className='btn btn-light'>
            Finished Book
          </button>
        </div>
        {displayRating ? (
          <Fragment>
            <div className='form-group rating'>
              <label for='cars'>Rate the Book:</label>
              <select
                name='rating'
                id='rating'
                value={rating}
                onChange={(e) => onChange(e)}>
                <option value='one'>1</option>
                <option value='two'>2</option>
                <option value='three'>3</option>
                <option value='four'>4</option>
                <option value='five'>5</option>
              </select>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Number of Days it Took'
                name='numOfDays'
                value={numOfDays}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Number of Current Page'
                name='numOfCurrentPage'
                value={numOfCurrentPage}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </Fragment>
        )}
        <input
          onSubmit={(e) => getFinishedValue(e)}
          type='submit'
          className='btn btn-primary my-1'
        />
        <a className='btn my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddNewBook.propTypes = {};

export default AddNewBook;
