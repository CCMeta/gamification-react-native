import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import DataGridComponent from '../components/DataGridComponent.jsx'

const TrashContainer = React.createClass({
    render () {
        return (
            <div>
                <DataGridComponent {...this.props} />
            </div>
        )
    }
})

function mapStateToProps(state) {
    let quests = state.quests.filter((quest) => quest.state === 4);
  return {
      quests,
      current: state.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCancelCompleteQuest: (id) => dispatch(actions.cancelCompleteQuest(id)),
    onCompleteQuest: (id) => dispatch(actions.completeQuest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashContainer)
