import React from 'react-native';
import {connect} from 'react-redux';

// import { Icon, TabBarIOS, Spinner} from 'react-native-icons/index.ios';
var {Icon} = require('react-native-icons/index.ios')

import * as actions from './actions/actionsCreators.jsx';

const {
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;


const RootComponent = React.createClass({
  getInitialState(){
    this.props.onFetchQuests();
    return {};
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
              {this.props.quests.map( (quest) => {
                return <Text key={quest.id} style={styles.welcome}>{quest.text}</Text>
              })}
          </View>
        </ScrollView>
        <View style={styles.info}>
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
        </View>
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
