import * as actionTypes from '../actions/actionTypes.jsx';

function items(state = [], action) {
  let newState;
  switch (action.type) {
      case actionTypes.RECEIVE_ITEMS:
        return action.items.reverse();
      case actionTypes.ADD_ITEM:
        return [ action.newItem, ...state ];
      default:
        return state;
  }
}

export default items;
