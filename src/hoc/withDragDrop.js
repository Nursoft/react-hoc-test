import React from 'react';

function withDrag(
    WrappedComponent , 
    onDragStart = ()=>{},
    onDrag      = ()=>{},
    onDragEnd   = ()=>{},
    onDragOver  = ()=>{},
    onDrop      = ()=>{},
  ){

	return class extends React.Component {
		constructor(props) {
    		super(props);
    }

  	render() {
  		return( 
        <div 
          draggable="true" 
          onDragStart={(ev)=>{onDragStart(ev)}}
          onDrag={(ev)=>{onDrag(ev)}}
          onDragEnd={(ev)=>{ev.preventDefault(); onDragEnd()}}
          onDragOver={(ev)=>{ev.preventDefault(); onDragOver()}}
          onDrop={(ev)=>{ev.preventDefault(); onDrop(ev)}}
        >
    			<WrappedComponent
    				{...this.props}
    			/>
        </div>
  		)
  	}
	}
}


export default withDrag