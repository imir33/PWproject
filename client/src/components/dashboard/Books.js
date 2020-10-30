import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Books = ({ books }) => {
  const booksTable = books.map((book) => (
    <tr hey={book._id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>
        {book.currentPage}/{book.numberOfPages}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
      <td>
        <button className='btn btn-primary'>Edit</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Books</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Page</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{booksTable}</tbody>
      </table>
    </Fragment>
  );
};

Books.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Books;
