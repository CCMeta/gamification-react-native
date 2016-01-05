import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from './actions/actionsCreators.jsx';
import Drawer from 'react-native-drawer';

import TodayContainer from './containers/TodayContainer.jsx';
import LeftNavComponent from './components/LeftNavComponent.jsx';

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
      var drawerStyles =
      {
        drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, marginTop: 20},
        main: {}
      }
      return (

        <Drawer
          type="overlay"
          content={
            <LeftNavComponent navigator={global.nav}/>
          }
          tapToClose={true}
          openDrawerOffset={0.2}
          // 20% gap on the right side of drawer
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          >
          <Navigator
            ref={nav => global.nav = nav}
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
                return (
                  <Component/>
                )
              }
            }} />
          </Drawer>

        );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
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
