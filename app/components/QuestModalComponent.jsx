import React from 'react-native';
import MaterialKit from 'react-native-material-kit';
import {Icon} from 'react-native-icons/index.ios';
const DropDown = require('react-native-dropdown');

const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

const {
  ListView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} = React;

const {
  MKTextField,
  MKIconToggle,
  MKButton,
  mdl
} = MaterialKit;

const QuestModalComponent = React.createClass({
  getInitialState(){
    return {
      gold: "0",
      exp: "0",
    }
  },
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  },
    _canada(province) {

    this.setState({
      ...this.state,
      canada: province
    });
  },
    componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['OPTIONLIST']);
  },
  render(){
    return (
      <View style={{ marginTop: 60, padding: 10 }}>
        <MKTextField
          style={{width: null, height: 40}}
          tintColor={"#E01515"}
          textInputStyle={{color: "#60BE29"}}
          placeholder="任务标题"/>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
          <Text style={{fontSize:20,flex:1,textAlign:"center"}}>
            Gold
          </Text>
          <mdl.Slider
            style={{flex:3}}
            value={this.state.gold}
            min={0}
            max={100}
            upperTrackColor="#CCE4F6"
            lowerTrackColor="#2DB7F5"
            onChange={(curValue) => this.setState({ ...this.state , gold: (parseInt(curValue/10)*10).toString()})}
            />
          <MKTextField
            keyboardType="numeric"
            onChangeText={(gold) => this.setState({ ...this.state , gold: gold.toString()})}
            value={this.state.gold}
            style={{width: null, height: 40,flex:1, }}
            tintColor={"#E01515"}
            textInputStyle={{color: "#60BE29"}}
            placeholder="GOLD"/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
          <Text style={{fontSize:20,flex:1,textAlign:"center"}}>
            EXP
          </Text>
          <mdl.Slider
            style={{flex:3}}
            value={this.state.exp}
            min={0}
            max={100}
            upperTrackColor="#CCE4F6"
            lowerTrackColor="#2DB7F5"
            onChange={(exp) => this.setState({ ...this.state , exp: (parseInt(exp/10)*10).toString()})}
            />
          <MKTextField
            keyboardType="numeric"
            onChangeText={(exp) => this.setState({ ...this.state , exp: exp.toString()})}
            value={this.state.exp}
            style={{width: null, height: 40,flex:1, }}
            tintColor={"#E01515"}
            textInputStyle={{color: "#60BE29"}}
            placeholder="EXP"/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
          <Select
            style={{flex:1}}
            ref="SELECT1"
            optionListRef={this._getOptionList}
            defaultValue="选择一个任务类型..."
            onSelect={this._canada}>
            <Option>收集箱</Option>
            <Option>今日待办</Option>
            <Option>下一步行动</Option>
            <Option>等待中</Option>
          </Select>
        </View>
        <MKTextField
          multiline={true}
          style={{width: null, height:40,flex:1,marginTop:10}}
          tintColor={"#E01515"}
          textInputStyle={{color: "#60BE29"}}
          placeholder="任务详情"/>
        <MKButton
          backgroundColor="60BE29"
          style={{marginTop:10,padding:10,justifyContent:'center',alignItems:"center"}}
          shadowRadius={2}
          shadowOffset={{width:0, height:2}}
          shadowOpacity={.7}
          shadowColor="black"
          onPress={() => {
            console.log('hi, raised button!');
          }}
          >
          <Text
            pointerEvents="none"
            style={{color: 'white', fontWeight: 'bold',fontSize:20}}>
            提交新任务
          </Text>
        </MKButton>
        <View style={{ backgroundColor:"#FFFFFF" }}>
          <OptionList style={{flex:1}}
            ref="OPTIONLIST"/>
        </View>
      </View>
    )
  }
})
export default QuestModalComponent
