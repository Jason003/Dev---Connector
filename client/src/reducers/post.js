import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_POST,
  CLEAR_POSTS
} from '../actions/type';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return { ...state, post: payload, loading: false };
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post: state.post ? { ...state.post, likes: payload.likes } : null,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        post: state.post ? { ...state.post, likes: payload.likes } : null
      };
    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts], loading: false };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    case CLEAR_POST:
      return { ...state, post: null, loading: false };
    case CLEAR_POSTS:
      return { ...state, posts: [], loading: false };
    default:
      return state;
  }
}
