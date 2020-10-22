//import api from '../utils/api';
import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './types';

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('api/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    //dispatch(loadUser());
  } catch (err) {
    // console log this
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
