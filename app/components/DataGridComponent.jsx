import React from 'react-native';
import MaterialKit from 'react-native-material-kit';
import {Icon} from 'react-native-icons/index.ios';

const {
  ListView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} = React;

const {
  MKIconToggle,
  MKButton
} = MaterialKit;

const DataGridComponent = React.createClass({
    getInitialState () {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      }
    },
    handleAddQuestEnterDown (e) {
    },
    handleQuestClick (quest) {
    },
    handleOk() {
    },
    handleCancel() {
    },
    handleDeadlineAtChange(value) {
    },
    handleAlertAtChange(value) {
    },
    handleRenderRow: function(rowData){
      let checked = (rowData.state === 1);
      return (
        <View style={{flexDirection: 'row', alignItems:"center", height: 60, borderBottomWidth: 1}}>
          <MKIconToggle
            checked={checked}
            onCheckedChange={()=>{}}
            onPress={()=>{}}
            style={{width: 30,height: 30, borderWidth: 2, borderRadius:100, margin:15,}}
            >
            <View
              state_checked={false}
              pointerEvents="none"
              >
              <Icon
                name='material|minus'
                size={30}
                color='#01BAD2'
                style={{width: 30, height: 30}}
                />
            </View>
            <View
              state_checked={true}
              pointerEvents="none"
              >
              <Icon
                name='material|check'
                size={30}
                color='#01BAD2'
                style={{width: 30, height: 30}}
                />
            </View>
          </MKIconToggle>
          <Text numberOfLines={1} style={{fontSize: 20,flex:1}}>
            {rowData.text}
          </Text>
          <Text
            pointerEvents="none"
            style={{color: '#FAC450', fontWeight: 'bold',justifyContent:"center",margin:15,}}>
            {"$" + rowData.gold}
          </Text>
        </View>
      )
    },
    render () {
        return (
          <View style={{ flex: 1, marginTop: 60}}>
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.props.quests)}
              renderRow={this.handleRenderRow}
            />
          </View>
        )
    }
})

export default DataGridComponent
