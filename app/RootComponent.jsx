import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from './actions/actionsCreators.jsx';
import Drawer from 'react-native-drawer';
import {Icon} from 'react-native-icons/index.ios';
import MaterialKit from 'react-native-material-kit';


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

const {
  MKIconToggle,
  MKCardStyles,
  MKButton
} = MaterialKit;

const RootComponent = React.createClass({
  getInitialState(){
    this.props.onFetchQuests();
    return {};
  },
  renderNavigatorRouteMapper(){
    const routeMapper = {
      LeftButton: (route, navigator, index, navState) => {
        // if (index === 0) {
        //   return null;
        // }
        // var previousRoute = navState.routeStack[index];
        return (
          <TouchableOpacity
            onPress={() => this.refs.drawer.open()}>
            <Icon
              name='material|square-right'
              size={30}
              color='#FFFFFF'
              style={{width: 30, height: 30, marginLeft:10}}
              />
          </TouchableOpacity>
        );
      },
      RightButton: function(route, navigator, index, navState) {
        return (
          <TouchableOpacity>
            <Icon
              name='material|view-list'
              size={30}
              color='#FFFFFF'
              style={{width: 30, height: 30}}
              />
          </TouchableOpacity>
        );
      },
      Title: function(route, navigator, index, navState) {
        return (
          <View style={{height: 30, justifyContent:"center"}}>
          <Text style={{fontSize: 20, color: "#FFFFFF"}}>
            {route.title}
          </Text>
        </View>
        );
      },
    };// end of routeMapper
    return routeMapper;
  },
  renderNavigator(){
    var initialRoute = {
      name: 'today',
      title: "今日待办",
      component: TodayContainer
    };
    return (
      <Navigator
        ref={nav => global.nav = nav}
        style={{paddingLeft: 0, paddingRight: 0}}
        initialRoute={initialRoute}
        configureScene={() => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor: "#01BAD2"}}
            routeMapper={this.renderNavigatorRouteMapper()}
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
    )
  },
  render: function() {
      var drawerStyles =
      {
        drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, marginTop: 20},
        main: {}
      }
      return (
        <Drawer
          ref="drawer"
          type="overlay"
          content={
            <LeftNavComponent navigator={global.nav}/>
          }
          tapToClose={true}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          >
          {this.renderNavigator()}
          </Drawer>
        );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
