import actionTypes from '../actions/actionTypes.jsx';

function quests(state = [], action) {
  let newState
  let questIndex
  switch (action.type) {
    case actionTypes.EDIT_QUEST:
      questIndex = state.findIndex((quest) => quest.id === action.newQuest.id);
      return [
        ...state.slice(0, questIndex),
        Object.assign({}, state[questIndex], action.newQuest),
        ...state.slice(questIndex + 1)
      ];
    case actionTypes.COMPLETE_QUEST:
      questIndex = state.findIndex((quest) => quest.id === action.newQuest.id);
      return [
        ...state.slice(0, questIndex),
        Object.assign({}, state[questIndex], action.newQuest),
        ...state.slice(questIndex + 1)
      ];
    case actionTypes.CANCEL_COMPLETE_QUEST:
      questIndex = state.findIndex((quest) => quest.id === action.newQuest.id);
      return [
        ...state.slice(0, questIndex),
        Object.assign({}, state[questIndex], action.newQuest),
        ...state.slice(questIndex + 1)
      ];
    case actionTypes.ADD_QUEST:
      return [ action.newQuest, ...state ];
    case actionTypes.RECEIVE_QUESTS:
      return action.quests.reverse();
    default:
      return state;
  }
}

export default quests;
