import React from 'react-native';
import {connect} from 'react-redux';

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
      <ScrollView>
        <View style={styles.container} ref="RootComponent">
            {this.props.quests.map( (quest) => {
              return <Text key={quest.id} style={styles.welcome}>{quest.text}</Text>
            })}
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Shake or press menu button for dev menu
          </Text>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    // flex: 1,
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
