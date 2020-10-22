import axios from 'axios';
import { setAlert } from './alert';

import { GET_BOOKS, BOOKS_ERROR } from './types';

// Get current users books
export const getBooksOfCurrent = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/books');

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add new book
export const addNewBook = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/books', formData, config);

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });

    dispatch(setAlert('Book Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BOOKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
