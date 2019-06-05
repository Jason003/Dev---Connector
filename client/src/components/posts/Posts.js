import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          {/* <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community
          </p> */}
          {/* <PostForm /> */}
          <Link to='/add-post' className='btn btn-light'>
            Add Post
          </Link>
          <div className='posts'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} detailed={false} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ post }) => {
  return { post };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
