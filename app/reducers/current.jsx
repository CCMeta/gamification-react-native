import * as actionTypes from '../actions/actionTypes.jsx';

let navType = navTypeMapping();
let defaultState = {
    navType
}
//可能再存一个当前服务器地址的url 来代替现在写字符串的形式

function current(state = defaultState, action) {
  let newState;
  switch (action.type) {
      case actionTypes.PUT_CURRENT_NAV_TYPE:
          let navType = navTypeMapping();
          return Object.assign({}, state, {navType})
      default:
      return state;
  }
}

/*****lib*****/
function navTypeMapping(){
  let newState, navType = window.location.hash.replace('#/','').split("?")[0];
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
      case "tree":
          newState = 7;
          break;
      case "shop":
          newState = 9;
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

export default current;
