import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({ userId }) => {
  return (
    <div className='dash-buttons'>
      <Link to={`/profile/${userId}`} className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> View My Profile
      </Link>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
