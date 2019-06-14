import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { forgotPassword } from '../../actions/auth';
import { connect } from 'react-redux';

const ForgotPassword = ({ history, forgotPassword, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    forgotPassword(email, history);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Find Your Password</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Enter Your Email
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
      <p className='my-1'>
        <Link onClick={() => history.goBack()}>Back</Link>
      </p>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);
