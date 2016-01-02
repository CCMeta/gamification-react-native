import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import DataGridComponent from '../components/DataGridComponent.jsx'

const DoneContainer = React.createClass({
    render () {
        return (
            <div>
                <DataGridComponent {...this.props} />
            </div>
        )
    }
})
function mapStateToProps(state) {
    let quests = state.quests.filter((quest) => quest.state === 1);
  return {
      quests,
      current: state.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchEditQuest: (quest) => dispatch(actions.fetchEditQuest(quest)),
    onCancelCompleteQuest: (id) => dispatch(actions.cancelCompleteQuest(id)),
    onCompleteQuest: (id) => dispatch(actions.completeQuest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoneContainer)
