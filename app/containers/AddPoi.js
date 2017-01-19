import React, { Component } from 'react'
import {
  StyleSheet
, Text
, View
, TouchableNativeFeedback
, TouchableOpacity
, TextInput
, Platform
, ScrollView
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import _ from 'lodash'
import DateTimePicker from 'react-native-modal-datetime-picker'

import * as addPoiActions from '../actions/addPoi'
import * as ndActions from '../actions/navDrawer'

class AddPoi extends Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{marginTop: 30}}>
          <Text style={{}}>Latitude</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={lat=>this.props.addPoiActions.set({lat})}
            value={this.props.addPoi.lat}
            keyboardType='numeric'
          />
        </View>
        <View style={{}}>
          <Text style={{}}>Longitude</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={lat=>this.props.addPoiActions.set({lat})}
            value={this.props.addPoi.lat}
            keyboardType='numeric'
            placeholder='Longitude'
          />
        </View>
        {false &&
        <View style={{}}>
          <Text style={{}}>Date</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={lat=>this.props.addPoiActions.set({lat})}
            value={this.props.addPoi.lat}
            keyboardType='numeric'
          />
        </View>}
        {false &&
        <View style={{}}>
          <Text style={{}}>Time</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={lat=>this.props.addPoiActions.set({lat})}
            value={this.props.addPoi.lat}
            keyboardType='numeric'
          />
        </View>}
        <TouchableOpacity
          style={{padding: 10, backgroundColor: '#5bf'}}
          onPress={()=>this.props.addPoiActions.set({dtPickerVisible: true})}
        >
          <Text>Open Calendar</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.props.addPoi.dtPickerVisible}
          onConfirm={dt=>this.props.addPoiActions.set({dtPickerVisible: false, dt})}
          onCancel={()=>this.props.addPoiActions.set({dtPickerVisible: false})}
          mode='datetime'
          minDate={moment().toDate()}
        />
        <View style={{}}>
          <Text style={{}}>Description</Text>
          <TextInput
            style={[styles.textInput, {height: Math.max(this._descriptionHeight, 80)}]}
            onChangeText={description=>this.props.addPoiActions.set({description})}
            value={this.props.addPoi.description}
            multiline={true}
            placeholder='Describe your new Point of Interest'
            onChange={e=>this._descriptionHeight = e.nativeEvent.contentSize.height}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    minHeight: 40
  , borderWidth: 0.5
  , margin: 5
  , padding: 5
  }
})


export default connect(state=>({
  addPoi: state.addPoi
}), (dispatch)=>({
  addPoiActions: bindActionCreators(addPoiActions, dispatch)
, ndActions: bindActionCreators(ndActions, dispatch)
}))(AddPoi)


