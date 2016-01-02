import React from 'react';
import {Link} from 'react-router';
const RaisedButton = require('material-ui/lib/raised-button');
export default class FuckComponent extends React.Component {
  render() {
    return (
      <div>
        <h1 onClick={() => this.props.onFuckClick(this.props.fuckState)}>

          Hello world!!{this.props.fuckState}
          <RaisedButton label="what the fuck" primary={true}/>
        </h1>
        {this.props.children &&
            React.cloneElement(this.props.children, {onFuckClick: this.props.onFuckClick, fuckState: this.props.fuckState})}
      </div>
    )
  }
}
