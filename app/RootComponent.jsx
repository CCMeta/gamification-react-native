import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from './actions/actionsCreators.jsx';

const MK = require('react-native-material-kit');
// import { Icon, TabBarIOS, Spinner} from 'react-native-icons/index.ios';
var {Icon} = require('react-native-icons/index.ios');
const {
  MKCardStyles,
  MKButton
} = MK;
const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();


const {
  Navigator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} = React;


const SecondPageComponent = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
    },
    _pressButton: function() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:irstPageComponent了
            navigator.pop();
        }
    },
    render: function() {
      return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={this._pressButton}>
                <Text>点我跳回去</Text>
            </TouchableOpacity>
        </View>
      )
    }
});

var FirstPageComponent = React.createClass({
    getInitialState: function() {
        return {};
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
                name: 'SecondPageComponent',
                component: SecondPageComponent,
            })
        }
    },
    render: function() {
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={this._pressButton}>
                    <Text>点我跳转 + {this.props.NavigationBar}</Text>
                </TouchableOpacity>
            </View>
        );
    }
});

const RootComponent = React.createClass({
  getInitialState(){
    this.props.onFetchQuests();
    return {};
  },
  render: function() {
      var defaultName = 'FirstPageComponent';
      var defaultComponent = FirstPageComponent;
      return (
        <Navigator
          initialRoute={{ name: defaultName, component: defaultComponent }}
          configureScene={() => {
            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{

                LeftButton: function(route, navigator, index, navState) {
                  if (index === 0) {
                    // return null;
                  }

                  var previousRoute = navState.routeStack[index];
                  return (
                    <TouchableOpacity
                      onPress={() => navigator.pop()}
                      style={styles.navBarLeftButton}>
                      <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        {previousRoute.title + "<fuck"}
                      </Text>
                    </TouchableOpacity>
                  );
                },

                RightButton: function(route, navigator, index, navState) {
                  return (
                    <TouchableOpacity
                      onPress={() => navigator.push(newRandomRoute())}
                      style={styles.navBarRightButton}>
                      <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  );
                },

                Title: function(route, navigator, index, navState) {
                  return (
                    <Text style={[styles.navBarText, styles.navBarTitleText]}>
                      {route.title} [{index}]
                    </Text>
                  );
                },

              }}
              style={styles.navBar}
            />
          }
          renderScene={(route, navigator) => {
            let Component = route.component;
            if(route.component) {
              return <Component
                {...route.params}
                navigator={navigator} />
            }
          }} />

      )
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          <View>
              {this.props.quests.map( (quest) => {
                return <Text key={quest.id} style={styles.welcome}>{quest.text}</Text>
              })}
          </View>
        </ScrollView>
        <ScrollView>
          <ColoredRaisedButton/>
          <Icon
            name='ion|beer'
            size={150}
            color='#887700'
            style={{width:100,height:100}}
            />
          <Icon
            name='zocial|github'
            size={70}
            color='black'
            style={{width:100,height:100}}
            />
          <Icon
            name='fontawesome|facebook-square'
            size={70}
            color='#3b5998'
            style={{width:100,height:100}}
            />
          <Icon
            name='foundation|lightbulb'
            size={30}
            color='#777777'
            style={{width:100,height:100}}
            />

          <Icon
            name='material|face'
            size={30}
            color='#333333'
            style={{width:100,height:100}}
            />
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 20
  },
  info: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 3,
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
});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#000000',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#000000',
  },
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
    onFetchQuests: () => dispatch(actions.fetchQuests())
  }
}

  module.exports = connect(mapStateToProps, mapDispatchToProps)(RootComponent)
