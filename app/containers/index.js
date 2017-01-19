import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import FaIcon from 'react-native-vector-icons/FontAwesome'

import PoiMap from './PoiMap'
import Login from './Login'
import AddPoi from './AddPoi'
import Settings from './Settings'
import PoiList from './PoiList'
import ReviewList from './ReviewList'
import ReportIssue from './ReportIssue'

import Navigation from '../components/Navigation'
import NavigationDrawer from '../containers/NavigationDrawer'
import * as ndActions from '../actions/navDrawer';

const scenes = {
  PoiMap, Login, AddPoi, Settings, PoiList, ReviewList, ReportIssue
}

class MainApp extends Component {
  componentWillMount(){
    this.scene = 'PoiMap'
  }
  _setPage = page=>{
    this.props.ndActions.set({isOpen: false})
  }
  render() {
    const scene = this.scene
    const navigationProps = this.navigation ? {
      navigateTo: this.navigation.navigateTo
    , navigatePop: this.navigation.navigatePop
    , navigateReset: this.navigation.navigateReset
    } : null
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="blue"
          translucent={true}
        />
        <NavigationDrawer {...navigationProps}>
          <Navigation
            ref={n=>{
              if (!this.navigation){
                setTimeout(()=>{
                  this.forceUpdate()
                })
              }
              this.navigation=n
            }}
            scenes={scenes}
            initialScene={{scene}}
            setPage={this._setPage}
          />
        </NavigationDrawer>

      </View>
    )
  }
}

const styles = StyleSheet.create({
})


export default connect(state=>({
  //main: state.main
}), dispatch=>({
  ndActions: bindActionCreators(ndActions, dispatch)
}))(MainApp)
