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
, RefreshControl
} from 'react-native'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'

import * as poiListActions from '../actions/poiList'

class PoiList extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this._ds = this._ds.cloneWithRows(this.props.poiList.pois)
  }
  componentWillUpdate(props){
    this._ds = this._ds.cloneWithRows(props.pois)
  }
  render(){
    return (
      <View style={styles.container}>
        <ListView
          style={{flex:1}}
          dataSource={this._ds}
          enableEmptySections={true}
          renderRow={rowData=>(
            <View style={styles.item}>
              <Text>{rowData.name}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.props.poiList.isRefreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  , backgroundColor: 'white'
  , paddingTop: 20
  }
, item:{
    backgroundColor: '#CCC'
  , margin: 1
  }
, gridList: {
    flexDirection: 'row'
  , flexWrap: 'wrap'
    //, justifyContent: 'center'
  }
})

export default connect(state=>({
  poiList: state.poiList
}), dispatch=>({
  poiListActions: bindActionCreators(poiListActions, dispatch)
}))(PoiList)
