import { SetCurrentUserType } from '../actions/auth'
import { SET_CURRENT_USER } from '../actions/typesActions'


interface InitialState  {
  isAuthenticated: boolean
  user: object
}

const initialState:InitialState = {
  isAuthenticated: false,
  user: {}
}

export default (state:InitialState = initialState, action:SetCurrentUserType) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user: action.payload
      }
    default:
      return state
  }
}
