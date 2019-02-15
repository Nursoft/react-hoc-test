import React from 'react';
import ReactDOM from 'react-dom';

function withScrolling(WrappedComponent , endScrolling = ()=>{}){
	return class extends React.Component {
		constructor(props) {
    		super(props);
    		this.scrollRef = React.createRef();
    		this.onScroll  = this.onScroll.bind(this);
    	}

  	componentDidMount() {
      /*Add the scroll event listener*/
  		const scrollElement = ReactDOM.findDOMNode(this.scrollRef.current);
    	scrollElement.addEventListener('scroll', ()=> 
        {this.onScroll(scrollElement)
        }, false);
    }

    componentWillUnmount() {
      /*Remove the scroll event listener*/
      window.removeEventListener('scroll', this.onScroll, false);
    }

  	onScroll(element){
      /*Check if scrolled component is in the 70% of his height visible */
  		if((element.offsetHeight + element.scrollTop) >= 
		    ((element.offsetHeight + (element.scrollHeight - element.offsetHeight)*0.7))){
	      return endScrolling() 
		  }else{
        return
      }
  	}

  	render() {
  		return( 
  			<WrappedComponent
  				ref={this.scrollRef} 
  				{...this.props}
  			/>
  		)
  	}
	}
}


export default withScrolling