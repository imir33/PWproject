import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, connnect } from 'react-redux';
import { addNewBook } from '../../actions/books';

const AddNewBook = ({ addNewBook, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    numberOfPages: '',
    currentPage: '',
    finished: false,
    rating: 0,
    numberOfDays: '',
  });

  const [displayRating, toggleRating] = useState(false);

  const {
    title,
    author,
    numberOfPages,
    currentPage,
    finished,
    rating,
    numberOfDays,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      finished: displayRating,
    });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, finished: displayRating });
    addNewBook(formData, history);
    setFormData({
      title: '',
      author: '',
      numberOfPages: '',
      currentPage: '',
      finished: false,
      rating: 0,
      numberOfDays: '',
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add a New Book</h1>
      <small>* = required fields</small>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Book Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Book Author'
            name='author'
            value={author}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Number of Pages'
            name='numberOfPages'
            value={numberOfPages}
            onChange={(e) => onChange(e)}
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
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Number of Days it Took'
                name='numberOfDays'
                value={numberOfDays}
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
                name='currentPage'
                value={currentPage}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddNewBook.propTypes = {
  addNewBook: PropTypes.func.isRequired,
};

export default connect(null, { addNewBook })(withRouter(AddNewBook));
