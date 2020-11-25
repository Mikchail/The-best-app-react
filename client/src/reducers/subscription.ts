import {
  AddSubscriptionType,
  GetSubscriptionsType,
  RemoveSubscriptionType,
  SetSubscriptionLoadingType,
} from '../actions/subscription';
import {SUBSCRIPTION_LOADING, ADD_SUBSCRIPTION, GET_SUBSCRIPTIONS, DELETE_SUBSCRIPTION} from '../actions/typesActions';

interface InitialState {
  subscriptions: Array<any>;
  isLoading: boolean;
}
const initialState = {
  subscriptions: [],
  isLoading: false,
};

export default (
  state:InitialState = initialState,
  action: AddSubscriptionType | GetSubscriptionsType | RemoveSubscriptionType | SetSubscriptionLoadingType
) => {
  switch (action.type) {
    case SUBSCRIPTION_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
        isLoading: false,
      };
    case ADD_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: [action.payload, ...state.subscriptions],
      };
    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.filter((s) => s._id !== action.payload),
      };
    default:
      return state;
  }
};
