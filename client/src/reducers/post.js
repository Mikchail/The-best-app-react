import {
  ADD_POST,
  CLEAR_POSTS,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  UPDATE_POST,
  UPDATE_POST_ON_PAGE,
  UPDATE_POSTS
} from '../actions/types'

const initialState = {
  posts: [],
  totalCount: 0,
  post: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        totalCount: 0
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalCount: action.payload.totalCount,
        isLoading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case UPDATE_POSTS:
      return {
        ...state,
        posts: state.posts.map((p) => p._id === action.payload._id ? action.payload : p)
      }
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      }
    case UPDATE_POST_ON_PAGE:
      const {id, body} = action.payload;
      const postByIndex = state.posts.findIndex((post) => post._id === id);
      const post = state.posts[postByIndex];
      const newPost = {
        ...post,
        body: body
      }
      return {
        ...state,
        posts: [...state.posts.slice(0, postByIndex), newPost, ...state.posts.slice(postByIndex + 1)]
      }
    default:
      return state
  }
}
