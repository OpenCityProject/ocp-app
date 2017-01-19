import * as types from '../actions/navigationTypes'

const initialState = {
  scene: {}
, navStack: []
}

export default function reducer(state=initialState, action={}) {
  switch (action.type) {
    case types.SET:
      return {...state, ...action.payload}
    default:
      return state
  }
}
