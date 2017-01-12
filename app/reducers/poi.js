import * as types from '../actions/poiTypes'

const initialState = {
  location: {}
}

export default function reducer(state=initialState, action={}) {
  switch (action.type) {
    case types.SET_LOCATION:
      return {...state, location: action.location}
    default:
      return state
  }
}

