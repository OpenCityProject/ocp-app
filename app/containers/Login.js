import React, { Component } from 'react'
import {
  StyleSheet
, Text
, View
, TouchableNativeFeedback
, TouchableOpacity
, Platform
, TextInput
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import DrawerLayout from 'react-native-drawer-layout'
import _ from 'lodash'

import * as loginActions from '../actions/login'

class Login extends Component {
  render(){
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    return (
      <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20, alignItems: 'center', justifyContent:'center'}}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={this.props.navigatePop}
        >
          <FaIcon name='angle-left' size={20}/>
        </TouchableOpacity>
        <Text style={{}}>Email</Text>
        <TextInput
          style={{minHeight: 40, borderWidth: 0.5, margin: 5, padding: 5}}
          onChangeText={email=>{
            if (/.*\t/.test(email)){
              return this._passwordInput.focus()
            }
            this.props.loginActions.set({email})
          }}
          value={this.props.login.email}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
        />
        <Text style={{}}>Password</Text>
        <TextInput
          ref={t=>this._passwordInput = t}
          style={{minHeight: 40, borderWidth: 0.5, margin: 5, padding: 5}}
          onChangeText={password=>this.props.loginActions.set({password})}
          value={this.props.login.password}
          secureTextEntry={true}
        />
        <Touchable
          style={{padding: 10, backgroundColor: '#5bf', margin: 10}}
          onPress={()=>{}}
        >
          <Text style={{color: 'white'}}>Login</Text>
        </Touchable>
        <Touchable
          style={{padding: 10, backgroundColor: '#5bf'}}
          onPress={()=>{}}
        >
          <Text style={{color: 'white'}}>Login with google account</Text>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute'
  , top: (Platform.OS==='ios' ? 20 : 0)
  , left: 0
  , padding: 10
  }
})

export default connect(state=>({
  login: state.login
}), dispatch=>({
  loginActions: bindActionCreators(loginActions, dispatch)
}))(Login)
