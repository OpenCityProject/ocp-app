import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
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
    this.props.poiActions.setLocation(location)
  }
  render() {
    const region = {...defaultRegion, ...this.props.poi.location}
    console.log('region!', region)
    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
        <MapView
          style={{flex: 1}}
          region={region}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
})


export default connect(state=>({
  poi: state.poi
}), (dispatch)=>({
  poiActions: bindActionCreators(poiActions, dispatch)
}))(PoiMap)

