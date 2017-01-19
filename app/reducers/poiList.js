import * as types from '../actions/poiListTypes'

const initialState = {
  pois: []
, isRefreshing: false
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
