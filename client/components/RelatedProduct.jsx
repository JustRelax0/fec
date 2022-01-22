import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Comparing from './Comparing.jsx';
import StarRating from '../overview/overviewcomponents/starRating.jsx';
import token from '../../config.js';

var RelatedProduct = (props) => {

  var [show, setShow] = useState(false);

  var changeShow = (e) => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  var changeProduct = (e) => {
    e.preventDefault();
    // console.log(props);
    props.product_selection(props.relatedProduct);
  }


  return (
    <div className={props.darkMode === false ? "carousel-item relatedProductCards": "carousel-item-dark relatedProductCards" } style={ {width: "20%"} }>

      <div className="carousel-action relatedProductCards" onClick={ () => {changeShow()}}>&#9733;</div>
      <div className = {props.darkMode === false ? "carousel-productDetails relatedProductCards": "carousel-productDetails-dark relatedProductCards"} onClick={changeProduct} >

      <img className = 'carousel-productImage relatedProductCards' src={props.relatedProduct.thumbnail_url}></img>
        <div className = {props.darkMode === false ? 'carousel-details relatedProductCards': 'carousel-details-dark relatedProductCards'}>
          <div className = {props.darkMode === false ? 'carousel-productCategory relatedProductCards' : 'carousel-productCategory-dark relatedProductCards'}> Category: {props.relatedProduct.category}  </div>
          <div className = 'carousel-productName relatedProductCards'>{props.relatedProduct.name}  </div>
          <div className = 'carousel-slogan relatedProductCards'>"{props.relatedProduct.slogan}" </div>
          <div className = 'carousel-product-description relatedProductCards'>{props.relatedProduct.description}</div>
          <div className = 'carousel-details-footer relatedProductCards'>
            <div className = 'carousel-starRating relatedProductCards'>
              <StarRating reviews={props.relatedProduct.reviews}/>
            </div>
            <div className = 'carousel-footer-separator relatedProductCards'></div>
            <div className = 'carousel-productPrice relatedProductCards'>${props.relatedProduct.default_price} </div>

          </div>
        </div>
      </div>
      <Comparing darkMode={props.darkMode} previewProduct={props.previewProduct} relatedProduct={props.relatedProduct} show={show} hide={changeShow}/>
    </div>

  );
}




export default RelatedProduct;