import { ADD_FRIEND, ADD_FRIEND_ERROR } from '../actions/types';

const initialState = {
  friends: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FRIEND:
      return {
        ...state,
        friends: payload,
        loading: false,
      };
    case ADD_FRIEND_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
