import React from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import DataGridComponent from '../components/DataGridComponent.jsx'

const DoneContainer = React.createClass({
    render: function() {
      return (
        <DataGridComponent {...this.props} />
      );
    }
});

function mapStateToProps(state) {
  let quests = state.quests.filter((quest) => quest.state === 1);
  return {
      quests
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoneContainer)
