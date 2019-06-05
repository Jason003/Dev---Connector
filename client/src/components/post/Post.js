import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPostById } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from '../post/CommentItem';

const Post = ({ getPostById, match, post: { post, loading }, history }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <button onClick={() => history.goBack()} className='btn'>
        Back
      </button>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ post }) => {
  return { post };
};

export default connect(
  mapStateToProps,
  { getPostById }
)(Post);
