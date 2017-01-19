import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import DrawerLayout from 'react-native-drawer-layout'
import _ from 'lodash'

import * as ndActions from '../actions/navDrawer'

class NavigationDrawer extends Component {
  _renderNavigationView = ()=>{
    return (
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS==='ios'?20:0}}>
        <View style={{padding: 10, paddingTop: 30, backgroundColor: '#5bf'}}>
          <Text style={{color: 'white'}}>I'm in the Drawer!</Text>
        </View>
        <View style={{padding: 10}}>
          <Text style={{}}>Todo:</Text>
        </View>
        <View style={{padding: 10}}>
          <Text style={{}}>LOGO</Text>
        </View>
        <TouchableHighlight
          style={{padding: 10}}
          onPress={()=>this.props.navigateTo('Login')}
          underlayColor='#ddd'
        >
          <Text style={{}}>Login/register (with google account?)</Text>
        </TouchableHighlight>
        <View style={{padding: 5, paddingLeft: 5}} onPress={()=>{}}>
          <Text style={{}}>Registered:</Text>
        </View>
        <TouchableHighlight
          style={{padding: 10}}
          onPress={()=>this.props.navigateTo('ReviewList')}
          underlayColor='#ddd'
        >
          <Text style={{}}>Review Submissions</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{padding: 10}}
          onPress={()=>this.props.navigateTo('Settings')}
          underlayColor='#ddd'
        >
          <Text style={{}}>Settings</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{padding: 10}}
          onPress={()=>this.props.navigateTo('ReportIssue')}
          underlayColor='#ddd'
        >
          <Text style={{}}>Report an issue</Text>
        </TouchableHighlight>
      </View>
    )
  }
  componentWillUpdate(props){
    if (props.navDrawer.isOpen && !this.props.navDrawer.isOpen) {
      this._drawer.openDrawer()
    } else if (!props.navDrawer.isOpen && this.props.navDrawer.isOpen) {
      this._drawer.closeDrawer()
    }
  }
  render(){
    return (
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={this._renderNavigationView}
        onDrawerClose={()=>this.props.ndActions.set({isOpen: false})}
        ref={d=>this._drawer=d}
      >
        {this.props.children}
      </DrawerLayout>
    )
  }
}

const styles = StyleSheet.create({
})

export default connect(state=>({
  navDrawer: state.navDrawer
}), dispatch=>({
  ndActions: bindActionCreators(ndActions, dispatch)
}))(NavigationDrawer)

