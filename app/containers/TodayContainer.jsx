import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
// import DataGridComponent from '../components/DataGridComponent.jsx'
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
  MKCardStyles,
  MKButton
} = MaterialKit;

const ColoredRaisedButton = MKButton.coloredButton()
.withText('BUTTON')
.withOnPress(() => {})
.build();

const TodayContainer = React.createClass({
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      };
    },
    componentDidMount: function() {
    },
    _pressButton: function() {
        const { navigator } = this.props;
        //或者写成 const navigator = this.props.navigator;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'TodayContainer',
                component: TodayContainer,
            })
        }
    },
    handleRenderRow: function(rowData){
      return (
        <View style={{flexDirection: 'row', alignItems:"center", height: 60, borderWidth: 1}}>
          <MKIconToggle
            checked={false}
            onCheckedChange={()=>{}}
            onPress={()=>{}}
            style={{width: 30,height: 30,borderWidth:1,borderRadius:500,margin:15}}
            >
            <Text
              pointerEvents="none"
              >卐</Text>
            <Text
              state_checked={true}
              pointerEvents="none"
              >卍</Text>
          </MKIconToggle>
          <Text style={{fontSize: 20}}>
            {"\0\0" + rowData.text}
          </Text>
        </View>
      )
    },
    render: function() {
      return (
        <View style={{flex:1, marginTop:60}}>
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.props.quests)}
            renderRow={this.handleRenderRow}
          />

          <TouchableOpacity onPress={this._pressButton}>
            <MKButton
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={this._pressButton}
              >
              <Text
                pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold',}}>
                我是 今日待办 点我跳转
              </Text>
            </MKButton>
          </TouchableOpacity>
        </View>
      );
    }
});


var styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

function mapStateToProps(state) {
  return {
      quests: state.quests
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayContainer)
