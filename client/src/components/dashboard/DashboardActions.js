import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='profile-buttons'>
      <Link to='/add-new-book' class='btn'>
        <i class='fas fa-book-open text-primary'></i> Add New Book
      </Link>
      <Link to='/add-friend' class='btn'>
        <i class='fas fa-user text-primary'></i> Add Friends
      </Link>
    </div>
  );
};

export default DashboardActions;
