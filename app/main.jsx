import React from 'react-native';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect, dispatch} from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import RootComponent from './RootComponent.jsx';
import rootReducer from './rootReducer.jsx';


const store = compose(
    applyMiddleware(
        thunkMiddleware
    )
)(createStore)(rootReducer);

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const Gamification = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    );
  }
});

React.AppRegistry.registerComponent('Gamification', () => Gamification);
