import React from 'react';
import token from '../../../config.js';
import axios from 'axios';
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      selectedSizeSkuID: undefined,
      sizeSelected: false,
      quantitySelected: false,
      selectedQuantity: 0
    }
  }
  sizeSelected(e) {
    e.preventDefault();
    if (e.target.value === "Select Size") {
      this.setState({
        sizeSelected: false,
        quantitySelected: false,
        quantity: 0,
        selectedSizeSkuID: undefined,
        selectedQuantity: 0
      })
    } else {
      var sku = JSON.parse(e.target.value);
      this.setState({
        quantity: sku.quantity,
        selectedSizeSkuID: sku.skuID,
        sizeSelected: true,
        quantitySelected: true,
        selectedQuantity: 1
      });
    }
  }
  quantitySelected(e) {
    e.preventDefault();
    this.setState({
      quantitySelected: e.target.value
    });
  }
  addToCart(e) {
    e.preventDefault();
    /** */
    var options = {
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart',
      headers: {
        Authorization: token,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        sku_id: this.state.selectedSizeSkuID,
        count: this.state.selectedQuantity
      }
    }
    axios(options)
    .catch(err => {
      console.log(err);
    });/* */
  }
  invalidAddToCart(e) {
    e.preventDefault();
    console.log('open size selector and display message to user');
  }
  render() {
    var skuList = [];
    if (this.props.currentStyle.skus !== undefined) {
      for (var sku in this.props.currentStyle.skus) {
        var newSku = Object.assign({skuID: sku}, this.props.currentStyle.skus[sku])
        skuList.push(newSku);
      }
    }
    /*
    for (var i = 0; i < skuList.length; i++ ) {
      skuList[i].quantity = 0;
    }
    /* out of stock tester function*/
    var quantitySelector = [];
    if (this.state.quantity > 0 && this.state.sizeSelected) {
      quantitySelector = <select className="quantity-selector overview" onChange={this.quantitySelected.bind(this)}>
        <option className="overview" value={1} selected>1</option>{
        Array.from({ length: (this.state.quantity - 1 > 14 ? 14 : this.state.quantity) }, (_, i) => {
          return <option className="overview" value={i + 2}>{i + 2}</option>
        })}
      </select>
    } else {
      quantitySelector = <select className="quantity-selector overview" disabled>
        <option className="overview" value={'-'} selected>-</option>
      </select>
    }
    var sizeOptionsList = [];
    for (var i = 0; i < skuList.length; i++) {
      if (skuList[i].quantity > 0) {
        sizeOptionsList.push(<option className="overview" value={JSON.stringify(skuList[i])}>{skuList[i].size}</option>);
      }
    }
    var sizeSelector = [];
    if (sizeOptionsList.length > 0) {
      sizeSelector = <select className="size-selector overview" onChange={this.sizeSelected.bind(this)} name="size">
        <option className="overview" value="Select Size" selected>Select Size</option>
        {sizeOptionsList}
      </select>
    } else {
      sizeSelector = <select className="size-selector overview" name="size" disabled>
        <option value="OUT OF STOCK" selected>OUT OF STOCK</option>
      </select>
    }
    var addToCartButton = [];
    if (sizeOptionsList.length === 0) { //no stock
      //button shouldnt exist in this situation
    } else if (this.state.sizeSelected && this.state.quantitySelected) { //valid size and quantity
      //button works as expected
      addToCartButton = <button className="add-to-cart-button overview" onClick={this.addToCart.bind(this)}>Add To Cart</button>
    } else { //select size is selected (not valid size and quantity)
      //
      addToCartButton = <button className="add-to-cart-button overview" onClick={this.invalidAddToCart.bind(this)}>Add To Cart</button>
    }
    return (
      <div className="add-to-cart overview">
        {sizeSelector}
        {quantitySelector}
        {addToCartButton}
      </div>
    );
  }
};
/*
*/
export default AddToCart;