import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExperience } from '../../actions/profile';
import { setAlert } from '../../actions/alert';

const EditExperience = props => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  let experience;

  useEffect(() => {
    if (!experience) return;
    setFormData({
      company: !experience.company ? '' : experience.company,
      title: !experience.title ? '' : experience.title,
      location: !experience.location ? '' : experience.location,
      from: !experience.from ? '' : experience.from.substring(0, 10),
      to: !experience.to ? '' : experience.to.substring(0, 10),
      current: !experience.current ? false : experience.current,
      description: !experience.description ? '' : experience.description
    });
  }, [experience]);

  // get the experience to edit
  const id = props.location.state;
  const experiences = props.experience.filter(exp => exp._id === id);
  if (experiences.length === 0) {
    return <Redirect to='/dashboard' />;
  }
  experience = experiences[0];

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit An Experience</h1>
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
          } else props.editExperience(id, formData, props.history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
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
            Current Job
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
            placeholder='Job Description'
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

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

const mapStateToProps = ({ profile }) => {
  return { experience: profile.profile ? profile.profile.experience : [] };
};

export default connect(
  mapStateToProps,
  { editExperience, setAlert }
)(withRouter(EditExperience));
