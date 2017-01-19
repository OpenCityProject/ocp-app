import * as types from './reportIssueTypes'

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


