import axios from 'axios';
import {PostTypes} from '../types';
import {Dispatch} from 'redux';
import {
  POST_LOADING,
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  CLEAR_POSTS,
  UPDATE_POST,
  UPDATE_POST_ON_PAGE,
} from './typesActions';

export const create = (post: PostTypes) => (dispatch: Dispatch) => {
  axios.post('/api/posts', post).then((res) =>
    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
  );
};
export const update = (id: string | number, body: string) => (dispatch: Dispatch) => {
  axios.put(`/api/posts/`, {body, _id: id}).then((res) => dispatch(updatePostOnPage(body, id)));
};

export const getAll = (params: string) => (dispatch: Dispatch) => {
  dispatch(setPostLoading(true));
  axios
    .get('/api/posts', {params})
    .then((res) => dispatch(getPosts(res)))
    .catch(() => {
      dispatch(setPostLoading(false));
      dispatch(clearPosts());
    });
};

export const getById = (id: string | number) => (dispatch: Dispatch) => {
  dispatch(setPostLoading(true));
  axios
    .get(`/api/posts/${id}`)
    .then((res) => dispatch(getPost(res)))
    .catch(() => dispatch(setPostLoading(false)));
};

export const remove = (id: number) => (dispatch: Dispatch) => {
  axios.delete(`/api/posts/${id}`).then(() => dispatch(deletePostAction(id)));
};

export const createLike = (postId: number, TYPE: string) => (dispatch: Dispatch) => {
  axios.post(`/api/posts/${postId}/likes`).then((res) => dispatch(createLikeAction(res, TYPE)));
};

export const removeLike = (postId: number, likeId: number, TYPE: string) => (dispatch: Dispatch): void => {
  axios.delete(`/api/posts/${postId}/likes/${likeId}`).then((res) => dispatch(removeLikeAction(res, TYPE)));
};

export const createComment = (postId: number, comment: string) => (dispatch: Dispatch): void => {
  axios.post(`/api/posts/${postId}/comments`, comment).then((res) => dispatch(updatePost(res)));
};

export const removeComment = (postId: number, commentId: number) => (dispatch: Dispatch): void => {
  axios.delete(`/api/posts/${postId}/comments/${commentId}`).then((res) => dispatch(updatePost(res)));
};

export type ClearPostsType = {
  type: CLEAR_POSTS,
};

export type SetPostLoadingType = {
  type: POST_LOADING,
  payload: boolean,
};

export type UpdatePostType = {
  type: POST_LOADING,
  payload: any,
};
export type RemoveLikeActionType = {
  type: string,
  payload: any,
};

export type CreateLikeActionType = {
  type: string,
  payload: any,
};

export type DeletePostActionType = {
  type: DELETE_POST,
  payload: number,
};
export type GetPostActionType = {
  type: GET_POST,
  payload: any,
};
export type GetPostsActionType = {
  type: GET_POST,
  payload: any,
};
export type UpdatePostOnPageType = {
  type: UPDATE_POST_ON_PAGE,
  payload: any,
};

const updatePostOnPage = (body: string, id: string | number) => ({
  type: UPDATE_POST_ON_PAGE,
  payload: {body, id},
});
const getPosts = (res: any) => ({
  type: GET_POSTS,
  payload: {
    posts: res.data,
    totalCount: +res.headers['x-total-count'],
  },
});

const getPost = (res: any) => ({
  type: GET_POST,
  payload: res.data,
});
const deletePostAction = (id: number) => ({
  type: DELETE_POST,
  payload: id,
});

const createLikeAction = (res: any, TYPE: string) => ({
  type: TYPE,
  payload: res.data,
});
const removeLikeAction = (res: any, TYPE: string) => ({
  type: TYPE,
  payload: res.data,
});

const updatePost = (res: any) => ({
  type: UPDATE_POST,
  payload: res.data,
});

const clearPosts = () => ({
  type: CLEAR_POSTS,
});

const setPostLoading = (isLoading: boolean) => ({
  type: POST_LOADING,
  payload: isLoading,
});
