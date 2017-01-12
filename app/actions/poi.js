import * as types from './poiTypes'

export function setLocation(location) {
  return {
    type: types.SET_LOCATION
  , location
  }
}

