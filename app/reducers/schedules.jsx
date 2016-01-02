import * as actionTypes from '../actions/actionTypes.jsx';

function schedules(state = [], action) {
  let newState
  let scheduleIndex
  switch (action.type) {
    case actionTypes.RECEIVE_SCHEDULES:
      return action.schedules.reverse();
    case actionTypes.ADD_SCHEDULE:
      return [ action.newSchedule, ...state ];
    case actionTypes.EDIT_SCHEDULE:
      scheduleIndex = state.findIndex((schedule) => schedule.id === action.newSchedule.id);
      return [
        ...state.slice(0, scheduleIndex),
        Object.assign({}, state[scheduleIndex], action.newSchedule),
        ...state.slice(scheduleIndex + 1)
      ];
    default:
      return state;
  }
}

export default schedules;
