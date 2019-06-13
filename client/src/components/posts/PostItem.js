import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date, title },
  auth,
  addLike,
  removeLike,
  deletePost,
  detailed
}) => {
  var liked = false;
  likes.map(like => {
    if (like.user === auth.user._id) {
      liked = true;
    }
  });
  return (
    <div
      className='post bg-white p-1 my-1'
      style={{ 'grid-template-columns': '0fr 4fr' }}
    >
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {!detailed ? (
          <Link to={`post/${_id}`}>
            <h3>{title}</h3>
          </Link>
        ) : (
          <h3>{title}</h3>
        )}

        <p className='my-1'>
          {detailed ? text : text.substring(0, 200) + '...'}
        </p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => {
            if (liked) removeLike(_id);
            else addLike(_id);
            liked = !liked;
          }}
        >
          <i
            className='fas fa-thumbs-up'
            style={liked ? { color: 'teal' } : {}}
          />{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        {/* <button
          type='button'
          className='btn btn-light'
          onClick={() => removeLike(_id)}
        >
          <i className='fas fa-thumbs-down' />{' '}
        </button> */}
        {!detailed && (
          <Link to={`post/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
        )}
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deletePost(_id)}
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  detailed: true
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
