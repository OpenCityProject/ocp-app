import * as types from '../actions/addPoiTypes'

const initialState = {
  lat: ''
, lng: ''
, date: ''
, time: ''
, dt: ''
, description: ''
, dtPickerVisible: false
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
