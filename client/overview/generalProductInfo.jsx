import React from 'react';
import token from '../../config.js';
// const axios = require('axios');
import axios from 'axios';
import StyleSelector from './overviewcomponents/styleselector.jsx';
import Gallery from './overviewcomponents/gallery.jsx';
import AddToCart from './overviewcomponents/addtocart.jsx';
import StarRating from './overviewcomponents/starRating.jsx';


const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
class GeneralProductInfo extends React.Component {
  constructor (props) {
    super(props);
    this.selectProduct = this.selectProduct.bind(this);
    this.state = {
      styles: [],
      currentStyle: {}
    };
  }
  requestProductStyles() {
    if(this.props.product.id !== undefined) {
      axios.get(API_URL + 'products/' + this.props.product.id + '/styles',
        {
          headers: {
            Authorization: token
          }
      })
      .then(results => {
        this.setState({
          styles: results.data.results,
          currentStyle: results.data.results[0]
        });
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      axios.get(API_URL + 'products/' + JSON.stringify(this.props.productid) + '/styles',
      {
        headers: {
          Authorization: token
        }
    })
    .then(results => {
      this.setState({
        styles: results.data.results,
        currentStyle: results.data.results[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
    }
  }
  // componentDidMount() {
  //   if (this.state.styles.length === 0) {
  //       this.requestProductStyles();
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.styles.length === 0 || prevProps.product.id !== this.props.product.id) {
      this.requestProductStyles();
    }
  }
  selectProduct(e) {
    e.preventDefault();
    this.props.productSelector(this.props.product.id);
  }
  updateGallery = (newStyle) => {
    this.setState({
      currentStyle: newStyle
    });
  }
  //this.state.product.reviews
  render() {

    var features = [];

    for (var i in this.props.product.features) {
      features.push(<li className="feature-list-item overview">{this.props.product.features[i].feature + ': ' + this.props.product.features[i].value}</li>)
    }
    return (
      <div className='product-general-info overview'>
        <div className='product-info overview'>
          <StarRating reviews={this.props.product.reviews}/>
          <h3 className='product-category overview'>{this.props.product.category}</h3>
          <h1 className='product-title overview'>{this.props.product.name}</h1>
          <div className='product-price overview'>{this.props.product.default_price}</div>
          <StyleSelector updateGallery={this.updateGallery.bind(this)} styles={this.state.styles}/>
          <AddToCart currentStyle={this.state.currentStyle}/>
          <ul>{features}</ul>
        </div>
        <Gallery currentStyle={this.state.currentStyle}/>
        <div className='product-overview overview'>{this.props.product.description}</div>
      </div>
    )
  }
}
/*
*/
export default GeneralProductInfo;