import axios from 'axios';
import { setAlert } from './alert';

import { ADD_FRIEND, ADD_FRIEND_ERROR } from './types';

// Add new friend
export const addNewFriend = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('api/friends/request', formData, config);

    dispatch({
      type: ADD_FRIEND,
      payload: res.data,
    });

    dispatch(setAlert('Friend Added', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_FRIEND_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
