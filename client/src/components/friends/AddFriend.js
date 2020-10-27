import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewFriend } from '../../actions/friends';

const AddFriend = ({ addNewFriend }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addNewFriend(formData);
    setFormData({
      email: '',
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Search Your Friends</h1>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn my-1' href='/dashboard'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddFriend.propTypes = {
  addNewFriend: PropTypes.func.isRequired,
};

export default connect(null, { addNewFriend })(withRouter(AddFriend));
