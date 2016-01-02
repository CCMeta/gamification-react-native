import { combineReducers } from 'redux';

import quests from './reducers/quests.jsx';


export const reducers = {
  quests
};

export default combineReducers(reducers);
