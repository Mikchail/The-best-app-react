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


interface IResponse {
  data: PostTypes
  posts?: []
  totalCount?: number,
  headers: {
    ['x-total-count']: number
  }
}
export const create = (post: PostTypes) => (dispatch: Dispatch): void => {
  axios.post('/api/posts', post).then((res: IResponse) =>{
    dispatch(ActionCreator.addPost(res.data))
  }
  );
};
export const update = (id: string | number, body: string) => (dispatch: Dispatch): void => {
  axios.put(`/api/posts/`, {body, _id: id}).then(() => dispatch(ActionCreator.updatePostOnPage(body, id)));
};

export const getAll = (params: string) => (dispatch: Dispatch): void => {
  dispatch(ActionCreator.setPostLoading(true));
  axios
    .get('/api/posts', {params})
    .then((res) => dispatch(ActionCreator.getPosts(res)))
    .catch(() => {
      dispatch(ActionCreator.setPostLoading(false));
      dispatch(ActionCreator.clearPosts());
    });
};

export const getById = (id: string | number) => (dispatch: Dispatch): void => {
  dispatch(ActionCreator.setPostLoading(true));
  axios
    .get(`/api/posts/${id}`)
    .then((res) => dispatch(ActionCreator.getPost(res)))
    .catch(() => dispatch(ActionCreator.setPostLoading(false)));
};

export const remove = (id: number) => (dispatch: Dispatch): void => {
  axios.delete(`/api/posts/${id}`).then(() => dispatch(ActionCreator.deletePostAction(id)));
};

export const createLike = (postId: number, TYPE: string) => (dispatch: Dispatch): void => {
  axios.post(`/api/posts/${postId}/likes`).then((res) => dispatch(ActionCreator.createLikeAction(res, TYPE)));
};

export const removeLike = (postId: number, likeId: number, TYPE: string) => (dispatch: Dispatch): void => {
  axios.delete(`/api/posts/${postId}/likes/${likeId}`).then((res) => dispatch(ActionCreator.removeLikeAction(res, TYPE)));
};

export const createComment = (postId: number, comment: string) => (dispatch: Dispatch): void => {
  axios.post(`/api/posts/${postId}/comments`, comment).then((res: IResponse) => dispatch(ActionCreator.updatePost(res)));
};

export const removeComment = (postId: number, commentId: number) => (dispatch: Dispatch): void => {
  axios.delete(`/api/posts/${postId}/comments/${commentId}`).then((res:IResponse) => dispatch(ActionCreator.updatePost(res)));
};


export const ActionCreator = {
  addPost: (data: PostTypes):AddPostType=>({
    type: ADD_POST,
    payload: data,
  }),
  updatePostOnPage: (body: string, id: string | number):UpdatePostOnPageType => ({
    type: UPDATE_POST_ON_PAGE,
    payload: {body, id},
  }),
  getPosts: (res: IResponse):GetPostsActionType => ({
    type: GET_POSTS,
    payload: {
      posts: res.data,
      totalCount: +res.headers['x-total-count'],
    },
  }),

  getPost: (res: IResponse):GetPostActionType => ({
    type: GET_POST,
    payload: res.data,
  }),
  deletePostAction: (id: number):DeletePostActionType => ({
    type: DELETE_POST,
    payload: id,
  }),

  createLikeAction: (res: IResponse, TYPE: string):CreateLikeActionType => ({
    type: TYPE,
    payload: res.data,
  }),
  removeLikeAction: (res: IResponse, TYPE: string):RemoveLikeActionType => ({
    type: TYPE,
    payload: res.data,
  }),

  updatePost: (res: IResponse):UpdatePostType => ({
    type: UPDATE_POST,
    payload: res.data,
  }),
  clearPosts: ():ClearPostsType => ({
    type: CLEAR_POSTS,
  }),

  setPostLoading: (isLoading: boolean):SetPostLoadingType => ({
    type: POST_LOADING,
    payload: isLoading,
  }),
};


export type AddPostType = {
  type: ADD_POST,
  payload: any,
};
export type ClearPostsType = {
  type: CLEAR_POSTS,
};

export type SetPostLoadingType = {
  type: POST_LOADING,
  payload: boolean,
};

export type UpdatePostType = {
  type: UPDATE_POST,
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
  type: GET_POSTS,
  payload: any,
};
export type UpdatePostOnPageType = {
  type: UPDATE_POST_ON_PAGE,
  payload: any,
};