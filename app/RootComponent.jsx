import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from './actions/actionsCreators.jsx';

import TodayContainer from './containers/TodayContainer.jsx';
var Drawer = require('react-native-drawer');

const {
  Navigator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} = React;

const RootComponent = React.createClass({
  getInitialState(){
    this.props.onFetchQuests();
    return {};
  },
  render: function() {
    const routeMapper = {
      LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
          return null;
        }
        var previousRoute = navState.routeStack[index];
        return (
          <TouchableOpacity
            onPress={() => navigator.pop()}>
            <Text>
              {previousRoute.title}
            </Text>
          </TouchableOpacity>
        );
      },

      RightButton: function(route, navigator, index, navState) {
        return (
          <TouchableOpacity
            onPress={() => navigator.push(newRandomRoute())}>
            <Text>
              下一个?
            </Text>
          </TouchableOpacity>
        );
      },

      Title: function(route, navigator, index, navState) {
        return (
          <Text>
            {route.name} [{index}]
          </Text>
        );
      },
    };// end of routeMapper
      var defaultName = 'today';
      var defaultComponent = TodayContainer;
      var drawerStyles = {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
        marginTop: 20
      };
      var mainStyles = {};
      return (

        <Drawer
          type="overlay"
          content={
            <Text>我是控制面板</Text>
          }
          tapToClose={true}
          openDrawerOffset={0.5}
          panCloseMask={0.5}
          closedDrawerOffset={-3}
          styles={{
            drawer: drawerStyles,
            main: mainStyles
          }}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          >

          <Navigator
            style={{paddingLeft: 0, paddingRight: 0}}
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={() => {
              return Navigator.SceneConfigs.VerticalDownSwipeJump;
            }}
            navigationBar={
              <Navigator.NavigationBar
                style={{backgroundColor: "#01BAD2"}}
                routeMapper={routeMapper}
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

          </Drawer>
        );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
