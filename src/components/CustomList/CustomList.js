import React, { Component } from 'react';
import './CustomList.scss';

class CustomList extends Component {
  render() {
    return (
      <div className="list-wrapper">
        {this.props.data.map((element,index) =>{
        	return <li key={index}> {element.name} </li>
        	})
        }
      </div>
    );
  }
}

export default CustomList;