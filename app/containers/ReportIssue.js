import React, { Component } from 'react'
import {
  StyleSheet
, Text
, View
, TouchableNativeFeedback
, TouchableOpacity
, Platform
, TextInput
, ListView
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'

import * as riActions from '../actions/reportIssue'

class ReportIssue extends Component {
  componentWillMount(){
    this._descriptionHeight = 80
  }
  _onSubmit = ()=>{
    console.log('Make an API call')
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Text style={{}}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={email=>this.props.riActions.set({email})}
            value={this.props.reportIssue.email}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            placeholder='Your email address'
          />
        </View>
        <View style={{}}>
          <Text style={{}}>Description</Text>
          <TextInput
            style={[styles.textInput, {height: Math.max(this._descriptionHeight, 80)}]}
            onChangeText={description=>this.props.riActions.set({description})}
            value={this.props.reportIssue.description}
            multiline={true}
            placeholder='Describe what issue you are having'
            onChange={e=>this._descriptionHeight = e.nativeEvent.contentSize.height}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={this._onSubmit}
          >
            <Text>Submit Issue</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  , backgroundColor: 'white'
  , paddingTop: 20
  }
, item:{
    backgroundColor: '#CCC'
  , margin: 1
  }
, textInput: {
    minHeight: 40
  , borderWidth: 0.5
  , margin: 5
  , padding: 5
  , fontSize: 20
  }
})

export default connect(state=>({
  reportIssue: state.reportIssue
}), dispatch=>({
  riActions: bindActionCreators(riActions, dispatch)
}))(ReportIssue)

