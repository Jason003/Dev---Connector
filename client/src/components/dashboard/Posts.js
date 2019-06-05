import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsByUserId } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Posts = ({ post: { posts, loading }, getPostsByUserId, userId }) => {
  useEffect(() => {
    getPostsByUserId(userId);
  }, [getPostsByUserId, userId]);
  return (
    posts.length > 0 && (
      <Fragment>
        <h2 className='my-2'>Posts</h2>
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} detailed={false} />
          ))}
        </div>
      </Fragment>
    )
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPostsByUserId: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = ({ post }) => {
  return { post };
};

export default connect(
  mapStateToProps,
  { getPostsByUserId }
)(Posts);
