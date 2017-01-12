import React, {Component} from 'react'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
//import createSagaMiddleware from 'redux-saga'
//const sagaMiddleware = createSagaMiddleware()

import * as reducers from './reducers'
import CounterApp from './containers'

const logger = createLogger()
const initialState = {}
const middlewares = [
  //sagaMiddleware,
  logger
]
const enhancers = [
  applyMiddleware(...middlewares)
//, devTools()
]
const store = createStore(
  combineReducers(reducers)
, initialState
, compose(...enhancers)
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    )
  }
}
