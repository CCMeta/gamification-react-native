import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from './actions/actionsCreators.jsx';
import Drawer from 'react-native-drawer';
import {Icon} from 'react-native-icons/index.ios';
import MaterialKit from 'react-native-material-kit';


import TodayContainer from './containers/TodayContainer.jsx';
import LeftNavComponent from './components/LeftNavComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx';

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
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
        navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor: "#01BAD2"}}
            routeMapper={HeaderComponent}
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
        drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, marginTop: 60},
        main: {}
      }
      return (
        <Drawer
          ref={drawer => global.drawer = drawer}
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
