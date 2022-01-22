import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import plusSign from './src/plusSign.png';
import StarRating from '../overview/overviewcomponents/starRating.jsx';


var Outfit = (props) => {

  var clickHandler = (e) => {
    e.preventDefault();
    props.action(props.index);
  }



  if (props.defaultAdd === true) {

    return (
      <React.Fragment>
      <div className={props.darkMode === false ? "carousel-item relatedProductCards": "carousel-item-dark relatedProductCards" } style={ {width: "20%"} }>
        <div className="carousel-action"></div>
        <div className = {props.darkMode === false ? "carousel-productDetails relatedProductCards": "carousel-productDetails-dark relatedProductCards"} onClick={clickHandler}>
          <img className = 'carousel-productImage' src={plusSign}></img>
          <div className = {props.darkMode === false ? 'carousel-details relatedProductCards': 'carousel-details-dark relatedProductCards'}>
            <div className = {props.darkMode === false ? 'carousel-productCategory relatedProductCards' : 'carousel-productCategory-dark relatedProductCards'}>  </div>
            <div className = 'carousel-productName'>  </div>
            <div className = 'carousel-slogan'>Click Here to Add Current Product to Your Outfit List</div>
            <div className = 'carousel-product-description'> </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
      <div className={props.darkMode === false ? "carousel-item relatedProductCards": "carousel-item-dark relatedProductCards" } style={ {width: "20%"} }>
        <div className="carousel-add-action" onClick={clickHandler}>x</div>
        <div className = {props.darkMode === false ? "carousel-productDetails relatedProductCards": "carousel-productDetails-dark relatedProductCards"} onClick={props.product_selection}>
          <img className = 'carousel-productImage'  src={props.product.styles[0].photos[0].thumbnail_url}></img>
          <div className = {props.darkMode === false ? 'carousel-details relatedProductCards': 'carousel-details-dark relatedProductCards'}>
            <div className = {props.darkMode === false ? 'carousel-productCategory relatedProductCards' : 'carousel-productCategory-dark relatedProductCards'} />
            <div className = 'carousel-productName relatedProductCards'>{props.product.name}  </div>
            <div className = 'carousel-slogan relatedProductCards'>"{props.product.slogan}" </div>
            <div className = 'carousel-product-description relatedProductCards'>{props.product.description}</div>
            <div className = 'carousel-details-footer relatedProductCards'>
              <div className = 'carousel-productPrice relatedProductCards'> ${props.product.default_price} </div>
              <div className = 'carousel-starRating relatedProductCards'>
                <StarRating reviews={props.product.reviews}/>
              </div>
            </div>
          </div>
        </div>
      </div>
     </React.Fragment>
    );
  }
}




export default Outfit;