import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import FaIcon from 'react-native-vector-icons/FontAwesome'

import PoiMap from './PoiMap'
import * as mainActions from '../actions/main';

class MainApp extends Component {
  componentWillMount(){
    console.log('main props', this.props.main)
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <PoiMap />
      </View>
    )
  }
}

const styles = StyleSheet.create({
})


export default connect(state=>({
  main: state.main
}), (dispatch)=>({
  mainActions: bindActionCreators(mainActions, dispatch)
}))(MainApp)
