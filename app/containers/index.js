import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {bindActionCreators} from 'redux';
import * as mainActions from '../actions/main';
import { connect } from 'react-redux';
import FaIcon from 'react-native-vector-icons/FontAwesome'

class MainApp extends Component {
  componentWillMount(){
    console.log('main props', this.props.main)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <FaIcon name='rocket' size={30} color='#900'/>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})


export default connect(state=>({
  main: state.main
}), (dispatch)=>({
  mainActions: bindActionCreators(mainActions, dispatch)
}))(MainApp)
