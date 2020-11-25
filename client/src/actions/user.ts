import axios from 'axios';

import {GET_USER, USER_LOADING} from './typesActions';
import {Dispatch} from 'redux';

export const getUserById = (id: number) => (dispatch: Dispatch) => {
  dispatch(setUserLoading(true));
  axios
    .get(`/api/users/${id}`)
    .then((res) => dispatch(getUser(res)))
    .catch(() => dispatch(setUserLoading(false)));
};

const setUserLoading = (isLoading: boolean): SetUserLoadingType => ({
  type: USER_LOADING,
  payload: isLoading,
});
const getUser = (res: any): GetUserLoadingType => ({
  type: GET_USER,
  payload: res.data,
});
export type SetUserLoadingType = {
  type: USER_LOADING,
  payload: boolean,
};

export type GetUserLoadingType = {
  type: GET_USER,
  payload: any,
};
