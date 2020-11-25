import axios from 'axios'
import {Dispatch} from "redux";
import jwtDecode from 'jwt-decode'
import { SET_CURRENT_USER  } from './typesActions'
import setAuthToken from '../utils/setAuthToken'
import { UserLogin, UserRegister, UserType } from '../types'

export const register = (userData: UserRegister, history: any) => () => {
  axios
    .post('/api/auth/register', userData)
    .then(() => history.push('/login'))
}

export const login = (userData:UserLogin) => (dispatch:Dispatch):void => {
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data
      localStorage.setItem('access_token', token)
      setAuthToken(token)
      const decoded: any = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
    })
}

export const logout = () => (dispatch:Dispatch):void => {
  localStorage.removeItem('access_token')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}

export type SetCurrentUserType = {
  type: SET_CURRENT_USER
  payload: UserType | {}
}

export const setCurrentUser = (user:UserType | {}):SetCurrentUserType => ({
  type: SET_CURRENT_USER,
  payload: user
})
