import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Books from './Books';
import { getBooksOfCurrent } from '../../actions/books';

const Dashboard = ({
  getBooksOfCurrent,
  auth: { user },
  books: { books, loading },
}) => {
  useEffect(() => {
    getBooksOfCurrent();
  }, [getBooksOfCurrent]);

  return loading && books === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      <DashboardActions />
      {books !== null ? (
        <Books books={books} />
      ) : (
        <Fragment>
          <p>You have no books added yet to your account</p>
          <br />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getBooksOfCurrent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
});

export default connect(mapStateToProps, { getBooksOfCurrent })(Dashboard);
