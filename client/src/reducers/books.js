import { GET_BOOKS, BOOKS_ERROR, CLEAR_BOOKS } from '../actions/types';

const initialState = {
  books: null,
  friends: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        books: payload,
        loading: false,
      };
    case BOOKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        books: null,
        friends: [],
        loading: false,
      };
    default:
      return state;
  }
}
