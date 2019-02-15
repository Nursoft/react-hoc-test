import React, { Component } from 'react';
import './CustomBox.scss';

class CustomBox extends Component {
  render() {
    const boxStyle = {backgroundColor: this.props.color}
    return (
      <div className="holder">
        <div className="box" style={boxStyle} index={this.props.index}></div>
      </div>
    );
  }
}

export default CustomBox;