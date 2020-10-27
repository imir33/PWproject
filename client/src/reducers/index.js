import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import books from './books';
import friends from './friends';

export default combineReducers({
  alert,
  auth,
  books,
  friends,
});
