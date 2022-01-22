import React from 'react';
import ReactDOM from 'react-dom';


var CarouselButtons = (props) => {

  var handleClick = (e) => {
    if (e.target.classList[0] === 'carousel-button-right') {
      props.updateCarousel(1);
    } else {
      props.updateCarousel(-1);
    }
  }

  return (
    <React.Fragment>
      <div className = 'carousel-button-left relatedProductCards' onClick={handleClick}>&lt;</div>
      <div className = 'carousel-button-right relatedProductCards' onClick={handleClick}>&gt;</div>
    </React.Fragment>
  );
}




export default CarouselButtons;