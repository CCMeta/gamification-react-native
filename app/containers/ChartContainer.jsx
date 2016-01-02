import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import chartjs from "rc-chartjs"
const LineChart = chartjs.Line;

const ChartContainer = React.createClass({
    handleChartData(){
      let data = new Array(30).fill(0), labels = [], date_at = Date.now();
      for (let i = 0; i < 30 ; i++){
        labels.push(
          new Date(date_at - (i * 86400000)).getFullYear() + "-" +
          (new Date(date_at - (i * 86400000)).getMonth() + 1) + "-" +
          new Date(date_at - (i * 86400000)).getDate()
        )
      }
      labels.reverse();

      let labelIndex;
      this.props.quests.forEach((value) => {
        labelIndex = labels.findIndex((label) => label === value.done_at);
        if(labelIndex > -1){
          data[labelIndex] += value.gold
        }
      })
      // console.log(labels);
      return {
          labels: labels,
          datasets: [
              {
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: data
              }
          ]
      }//end of return
    },
    render () {
      const data = this.handleChartData();
      return (
        <div>
          <LineChart
            data={data}
            options={{}}
            width="1000"
            height="500"/>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer)
