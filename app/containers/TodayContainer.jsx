import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import DataGridComponent from '../components/DataGridComponent.jsx'

const TodayContainer = React.createClass({
    render: function() {
      return (
        <DataGridComponent {...this.props} />
      );
    }
});

function mapStateToProps(state) {
  let quests = state.quests.filter((quest) => quest.type === 1 && quest.state === 0);
  return {
      quests
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchEditQuest: (quest) => dispatch(actions.fetchEditQuest(quest)),
    onFetchAddQuest: (text,type) => dispatch(actions.fetchAddQuest(text,type)),
    onCompleteQuest: (id) => dispatch(actions.completeQuest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayContainer)
