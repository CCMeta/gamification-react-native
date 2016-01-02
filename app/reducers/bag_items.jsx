import * as actionTypes from '../actions/actionTypes.jsx';

function bag_items(state = [], action) {
  let newState;
  switch (action.type) {
      case actionTypes.RECEIVE_BAG_ITEMS:
        return action.bag_items.reverse();
      case actionTypes.ADD_BAG_ITEM:
        return [ action.newBagItem, ...state ];
      default:
        return state;
  }
}

/*****lib*****/
function navTypeMapping(navType){
  let newState
  switch (navType) {
      case "inbox":
          newState = 0
          break;
      case "next":
          newState = 2
          break;
      case "waiting":
          newState = 3
          break;
      case "schedule":
          newState = 4
          break;
      case "done":
          newState = 5
          break
      case "trash":
          newState = 6;
          break;
      case "chart":
          newState = 11;
          break;
      case "today":
      default:
          newState = 1
  }
  return newState
}

export default bag_items;
