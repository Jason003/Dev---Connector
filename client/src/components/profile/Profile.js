import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import Posts from '../dashboard/Posts';

const Profile = ({
  match,
  auth: { isAuthenticated, user },
  profile: { profile, loading },
  getProfileById,
  history
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <button onClick={() => history.goBack()} className='btn btn-light'>
            Back
          </button>
          {isAuthenticated && user._id === match.params.id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
          <div className='profile-grid my-2'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>{' '}
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>

              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      education={education}
                      key={education._id}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
          <Posts userId={user._id} />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, profile }) => ({ auth, profile });

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
