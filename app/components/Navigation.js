import React, { Component } from 'react'
import {
  Navigator
, BackAndroid
, Platform
, Text
, View
} from 'react-native'
import NavigationDrawer from '../containers/NavigationDrawer'

export default class Navigation extends Component {
  static propTypes = {
    scenes: React.PropTypes.object.isRequired
  , initialScene: React.PropTypes.object.isRequired
  , animate: React.PropTypes.bool
  , setPage: React.PropTypes.func
  }
  navigateTo = scene=>{
    this.props.setPage && this.props.setPage(scene)

    const navigator = this.navigator
    const routes = navigator.getCurrentRoutes()
    const prevRoute = routes.map(r=>r.scene).indexOf(scene)
    if (this.props.animate) {
      if (prevRoute > -1) {
        navigator.popToRoute(routes[prevRoute])
      } else {
        navigator.push({scene})
      }
    } else {
      const routeStack = prevRoute > -1 ? routes.slice(0, prevRoute+1) : routes.concat({scene})
      navigator.immediatelyResetRouteStack(routeStack)
    }
    return true
  }
  navigatePop = ()=>{
    const navigator = this.navigator
    const routes = navigator.getCurrentRoutes()
    if (routes.length == 1) {
      return false
    }
    
    const newPage = routes.slice(-1)[0].scene

    this.props.setPage && this.props.setPage(newPage)

    this.props.setPage(newPage)
    if (this.props.animate) {
      navigator.pop()
    } else {
      const routeStack = routes.slice(0, -1)
      navigator.immediatelyResetRouteStack(routeStack)
    }
    return true
  }
  navigateReset = scene=>{
    this.props.setPage && this.props.setPage(scene)

    const navigator = this.navigator
    if (this.props.animate) {
      return navigator.resetTo({scene})
    }
    const routeStack = [{scene}]
    navigator.immediatelyResetRouteStack(routeStack)
    return true
  }
  _renderScenes = (route, navigator)=>{
    const props = {
      navigator
    , navigateTo: this.navigateTo
    , navigatePop: this.navigatePop
    , navigateReset: this.navigateReset
    }
    if (route.scene in this.props.scenes) {
      const Scene = this.props.scenes[route.scene]
      return (
        <Scene {...props}/>
      )
    }
    return (
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Scene not found</Text>
      </View>
    )
  }
  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', ()=>{
      return this.navigatePop()
    })
  }
  render() {
    return (
      <Navigator
        ref={n=>this.navigator=n}
        initialRoute={this.props.initialScene}
        renderScene={this._renderScenes}
        style={{}}
        configureScene={(route, routeStack)=>{
          if (Platform.OS === 'android'){
            //return Navigator.SceneConfigs.PushFromRight
            return Navigator.SceneConfigs.FadeAndroid
          } else {
            return Navigator.SceneConfigs.PushFromRight // default
          }
        }}
      />
    );
  }
}
