import React from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-icons/index.ios';
import MaterialKit from 'react-native-material-kit';

const {
  ListView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} = React;

const {
  MKIconToggle,
  MKCardStyles,
  MKButton
} = MaterialKit;

const leftNavData = [
  {name: "today",title:"今日待办",icon:"material|play-circle-outline",navKey:1},
  {name: "inbox",title:"收集箱",icon:"material|inbox",navKey:0},
];


const LeftNavComponent = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(leftNavData),
    };
  },
  _pressButton: function() {
    const { navigator } = this.props;
    //或者写成 const navigator = this.props.navigator;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
      navigator.push({
        name: 'SecondPageComponent',
        component: SecondPageComponent,
      })
    }
  },
  renderRow(rowData){
    return (
      <View>
        <TouchableOpacity
          onPress={this._pressButton}
        >
          <View style={styles.themeItem}>
            <Icon
              name={rowData.icon}
              size={20}
              color='#01BAD2'
              style={{width: 20, height: 20}}/>
            <Text style={styles.themeName}>
              {rowData.title}
            </Text>
            <LeftNavComponentLengthSpan {...this.props} navKey={rowData.navKey}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
  renderHeader(){
      return (
        <View>
        </View>
      )
  },
  dataSource(){
    let dataSource = [];
    leftNavData.map((leftNav,index) => {
      dataSource.push({...leftNav});
    })
    return dataSource;
  },
    render () {
      return (
        <View style={styles.container}>
          <ListView
            ref="themeslistview"
            dataSource={this.state.dataSource.cloneWithRows(this.dataSource())}
            renderRow={this.renderRow}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
            renderHeader={this.renderHeader}
            style={{flex:1, backgroundColor: 'white'}}
          />
        </View>
        )
    }
})

const LeftNavComponentLengthSpan = React.createClass({
    handleLength (key) {
        let navCount;
        switch (parseInt(key)) {
            case 4:
                navCount = this.props.schedules.filter((schedule) => {
                    if(schedule.state === 0){
                        return schedule
                    }
                });;
                break;
            case 5:
                navCount = this.props.quests.filter((quest) => {
                    if(quest.state === 1){
                        return quest
                    }
                });
                break;
            default:
                navCount = this.props.quests.filter((quest) => {
                    if(quest.type === parseInt(key) && quest.state === 0){
                        return quest
                    }
                });
        }
        return navCount.length;
    },
    render () {
        return (
          <Text style={{fontSize: 16}}>
            {this.handleLength(this.props.navKey)}
          </Text>
        )
    }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
  },
  userInfo: {
    flex: 1,
    backgroundColor: '#00a2ed',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  menuText: {
    fontSize: 14,
    color: 'white',
  },
  homeTheme: {
    fontSize: 16,
    marginLeft: 16,
    color: '#00a2ed'
  },
  themeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  themeName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  themeIndicate: {
    marginRight: 16,
    width: 16,
    height: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

function mapStateToProps(state) {
  return {
      quests: state.quests
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //onFlashData: () => dispatch(actions.fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavComponent)
