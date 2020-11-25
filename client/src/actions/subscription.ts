import axios from 'axios';

import {SUBSCRIPTION_LOADING, ADD_SUBSCRIPTION, GET_SUBSCRIPTIONS, DELETE_SUBSCRIPTION} from './typesActions';
import {Dispatch} from 'redux';

export const create = (like: any) => (dispatch: Dispatch) => {
  axios.post('/api/subscriptions', like).then((res) => dispatch(ActionCreator.addSubscription(res)));
};

export const getAll = (params = {}) => (dispatch: Dispatch) => {
  dispatch(ActionCreator.setSubscriptionLoading(true));
  axios
    .get('/api/subscriptions', {params})
    .then((res) => dispatch(ActionCreator.getAll(res)))
    .catch(() => dispatch(ActionCreator.setSubscriptionLoading(false)));
};

export const remove = (id: number) => (dispatch: Dispatch) => {
  axios.delete(`/api/subscriptions/${id}`).then(() => dispatch(ActionCreator.removeSubscription(id)));
};

export const ActionCreator = {
  setSubscriptionLoading: (isLoading: boolean): SetSubscriptionLoadingType => ({
    type: SUBSCRIPTION_LOADING,
    payload: isLoading,
  }),
  removeSubscription: (id: number): RemoveSubscriptionType => ({
    type: DELETE_SUBSCRIPTION,
    payload: id,
  }),
  getAll: (res: any): GetSubscriptionsType => ({
    type: GET_SUBSCRIPTIONS,
    payload: res.data,
  }),
  addSubscription: (res: any): AddSubscriptionType => ({
    type: ADD_SUBSCRIPTION,
    payload: res.data,
  }),
};



export type AddSubscriptionType = {
  type: ADD_SUBSCRIPTION,
  payload: any,
};

export type GetSubscriptionsType = {
  type: GET_SUBSCRIPTIONS,
  payload: any,
};
export type RemoveSubscriptionType = {
  type: DELETE_SUBSCRIPTION,
  payload: number,
};
export type SetSubscriptionLoadingType = {
  type: SUBSCRIPTION_LOADING,
  payload: boolean,
};
