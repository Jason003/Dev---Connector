import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEducation } from '../../actions/profile';
import { setAlert } from '../../actions/alert';

const EditEducation = props => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  let education;

  useEffect(() => {
    if (!education) return;
    setFormData({
      school: !education.school ? '' : education.school,
      degree: !education.degree ? '' : education.degree,
      fieldofstudy: !education.fieldofstudy ? '' : education.fieldofstudy,
      from: !education.from ? '' : education.from.substring(0, 10),
      to: !education.to ? '' : education.to.substring(0, 10),
      current: !education.current ? false : education.current,
      description: !education.description ? '' : education.description
    });
  }, [education]);

  // get the education to edit
  const id = props.location.state;
  const educations = props.education.filter(exp => exp._id === id);
  if (educations.length === 0) {
    return <Redirect to='/dashboard' />;
  }
  education = educations[0];

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit An Education</h1>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          if (!current && to === '') {
            props.setAlert(
              "Please enter 'To Date' or check 'Current'",
              'danger'
            );
          } else props.editEducation(id, formData, props.history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={current ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
};

const mapStateToProps = ({ profile }) => {
  return { education: profile.profile ? profile.profile.education : [] };
};

export default connect(
  mapStateToProps,
  { editEducation, setAlert }
)(withRouter(EditEducation));
