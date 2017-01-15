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

const defaultRegion = {
  latitude: -36.918645,
  longitude: 175.0487399,
  latitudeDelta: 2,
  longitudeDelta: 1,
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
  _renderMenuButton(){
    if(Platform.OS==='android'){
      return (
        <TouchableNativeFeedback
          onPress={()=>this._drawer.openDrawer()}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <FaIcon name='bars' size={30} />
        </TouchableNativeFeedback>
      )
    } else {
      return (
        <TouchableOpacity
          style={{}}
          onPress={()=>this._drawer.openDrawer()}
        >
          <FaIcon name='bars' size={20} color='white'/>
        </TouchableOpacity>
      )
    }
  }
  _setRegion = region=>{
    this.props.poiActions.setLocation(region)
  }
  _renderNavigationView(){
    return (
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS==='ios'?20:0}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        <Text>Todo:</Text>
        <Text>LOGO</Text>
        <Text>Login/register (with google account?)</Text>
        <Text>Registered:</Text>
        <Text>Review Submissions</Text>
        <Text>Settings</Text>
        <Text>Report an issue</Text>
      </View>
    )
  }
  render() {
    const region = {...defaultRegion, ...this.props.poi.location}
    return (
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={this._renderNavigationView}
        ref={d=>this._drawer=d}
      >
        <View style={{flex: 1}}>
          <MapView
            style={{flex: 1}}
            region={region}
            onRegionChange={this._setRegion}
          />
          <View
            style={styles.menuButton}
          >
            {this._renderMenuButton()}
          </View>
        </View>
      </DrawerLayout>
    )
  }
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute'
  , top: 10 + (Platform.OS==='ios' ? 20 : 0)
  , left: 10
  }
})


export default connect(state=>({
  poi: state.poi
}), (dispatch)=>({
  poiActions: bindActionCreators(poiActions, dispatch)
}))(PoiMap)

