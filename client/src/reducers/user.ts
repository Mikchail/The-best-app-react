import {USER_LOADING, GET_USER} from '../actions/typesActions';
import {SetUserLoadingType, GetUserLoadingType} from '../actions/user';

const initialState = {
  user: null,
  users: null,
  isLoading: false,
};

export type InitialState = typeof initialState

export default (state:InitialState = initialState, action: SetUserLoadingType | GetUserLoadingType):InitialState => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
