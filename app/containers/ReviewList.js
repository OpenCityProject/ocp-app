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

import * as reviewListActions from '../actions/reviewList'

class ReviewList extends Component {
  constructor(props){
    super(props)
    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }
  componentWillUpdate(props){
    this._ds = this._ds.cloneWithRows(props.pois)
  }
  componentWillReceiveProps(newProps) {
    //http://stackoverflow.com/questions/38186114/react-native-redux-and-listview
    //let pois = newProps.reviewList.pois
    //pois = pois.map((p,i)=>
    //  (newProps.reviewList.pois.length > i && _.isEqual(p, this.props.reviewList.pois[i]))
    //  ? p
    //  : Object.assign({}, p)
    //)
    //this._ds = this._ds.cloneWithRows(pois)
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
              refreshing={this.props.reviewList.isRefreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
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
})

export default connect(state=>({
  reviewList: state.reviewList
}), dispatch=>({
  reviewListActions: bindActionCreators(reviewListActions, dispatch)
}))(ReviewList)

