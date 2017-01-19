import * as types from './reviewListTypes'

export function set(payload) {
  return {
    type: types.SET
  , payload
  }
}
export function reset() {
  return {
    type: types.RESET
  }
}


