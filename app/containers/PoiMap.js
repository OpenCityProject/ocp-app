import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import DrawerLayout from 'react-native-drawer-layout'
import _ from 'lodash'

import * as poiActions from '../actions/poi'
import * as ndActions from '../actions/navDrawer'

const defaultRegion = {
  latitude: -36.918645,
  longitude: 175.0487399,
  latitudeDelta: 2,
  longitudeDelta: 2,
}
class PoiMap extends Component {
  componentWillMount(){
    this._getPosition().catch(err=>{
      console.error('Error getting position', err.message, err)
    })
  }
  async _getPosition(){
    const options = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    const position = await new Promise((y,n)=>{
      navigator.geolocation.getCurrentPosition(y, n, options)
    })
    const location = _.pick(position.coords, ['latitude', 'longitude'])
    this.props.poiActions.setLocation({...this.props.poi.location, ...location})
  }
  _setRegion = region=>{
    this.props.poiActions.setLocation(region)
  }
  _renderMenuButton(){
    if(Platform.OS==='android'){
      return (
        <TouchableNativeFeedback
          style={styles.menuButton}
          onPress={()=>this.props.ndActions.set({isOpen: false})}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <FaIcon name='bars' size={30} />
        </TouchableNativeFeedback>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={()=>this.props.ndActions.set({isOpen: true})}
        >
          <FaIcon name='bars' size={20} color='white'/>
        </TouchableOpacity>
      )
    }
  }
  _renderFAB(){
    return (
      <TouchableOpacity
        onPress={()=>{
          this.props.navigateTo('AddPoi')
        }}
        style={styles.fab}
      >
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>+</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const region = {...defaultRegion, ...this.props.poi.location}
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={region}
          onRegionChange={this._setRegion}
        />
        {this._renderMenuButton()}
        {this._renderFAB()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute'
  , top: (Platform.OS==='ios' ? 20 : 0)
  , left: 0
  , padding: 15
  , shadowColor: '#555'
  , shadowOffset: {width: 1, height: 1}
  , shadowOpacity: 1
  , shadowRadius: 10
  }
, fab: {
    position: 'absolute'
  , bottom: 20
  , right: 20
  , borderRadius: 25
  , width: 50
  , height: 50
  , paddingBottom: 2
  , backgroundColor: '#5bf'
  , alignItems: 'center'
  , justifyContent: 'center'
  , shadowColor: '#555'
  , shadowOffset: {width: 0, height: 0}
  , shadowOpacity: 1
  , shadowRadius: 10
  }
})


export default connect(state=>({
  poi: state.poi
}), (dispatch)=>({
  poiActions: bindActionCreators(poiActions, dispatch)
, ndActions: bindActionCreators(ndActions, dispatch)
}))(PoiMap)

