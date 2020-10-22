import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooksOfCurrent } from '../../actions/books';

const Dashboard = ({ getBooksOfCurrent, auth, books }) => {
  useEffect(() => {
    getBooksOfCurrent();
  }, [getBooksOfCurrent]);

  return <div>Dashboard</div>;
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
