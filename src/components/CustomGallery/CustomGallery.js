import React, { Component } from 'react';
import './CustomGallery.scss';

class CustomGallery extends Component {
  render() {
    return (
      <div className="gallery-wrapper">
        {this.props.data.map((element,index) =>{
        	return (
            <div className="image-container">
              <img key={index} src={element.url} />
            </div>
          )}
        )}
      </div>
    );
  }
}

export default CustomGallery;