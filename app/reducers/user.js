import * as types from '../actions/userTypes'

const initialState = {
  email: ''
, role: '' // user, admin, something?
, token: ''
}

export default function reducer(state=initialState, action={}) {
  switch (action.type) {
    case types.SET:
      return {...state, ...action.payload}
    case types.RESET:
      return {...initialState}
    default:
      return state
  }
}
