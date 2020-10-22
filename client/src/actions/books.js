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
