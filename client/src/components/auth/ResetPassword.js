import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const ResetPassword = ({ match, history, resetPassword }) => {
  const resetPasswordLink = match.params.id;
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords don't match", 'danger');
    } else {
      resetPassword(resetPasswordLink, password, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Password</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Reset Password
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

export default connect(
  null,
  { resetPassword }
)(ResetPassword);
