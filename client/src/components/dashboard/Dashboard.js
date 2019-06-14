import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profile';
import { forgotPassword } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Posts from './Posts';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  forgotPassword,
  history
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile != null ? (
        <Fragment>
          <DashboardActions userId={user._id} />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <Posts userId={user._id} />
          <button
            className='btn btn-dark'
            onClick={() => {
              forgotPassword(user.email, history, true);
            }}
          >
            Reset Password
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile };
};
export default connect(
  mapStateToProps,
  { getCurrentProfile, forgotPassword }
)(Dashboard);
