import React from 'react';
import ReactDOM from 'react-dom';
import Questionapp from './Questions/questionapp.jsx';
import Reviews from './reviews/index.jsx';
import GeneralProductInfo from './overview/generalProductInfo.jsx';
import token from '../config.js';
import axios from 'axios';
import './style.css';
import RelatedProducts from './components/RelatedProducts.jsx';
import Outfits from './components/Outfits.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {},
      haveProduct: false,
      id: 59556,
      related: [],
      darkmode: false
    }
    this.productSelector = this.productSelector.bind(this);
    this.clickTracker = this.clickTracker.bind(this);
    this.modeToggle = this.modeToggle.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  modeToggle() {
    this.setState({
      darkmode: !this.state.darkmode
    })
  }

  productSelector(id=59556) {
    // don't make an api call for preview object if related cards pass back the object

    if (typeof id === 'object') {
      // console.log('no api call');
      this.setState({
        product: id
      })
    } else {
      var options = {
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/' + id,
        headers: {
          // Authorization: token,
          Authorization: token,
          accept: 'application/json',
          'content-type': 'application/json',
        }
      }
      return axios(options)
      .then(result => {
        var options = {
          method: 'get',
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`,
          headers: {
            // Authorization: token,
            Authorization: token,
            accept: 'application/json',
            'content-type': 'application/json',
          }
        }
        return axios(options)
        .then((stylesResult) => {
          result.data.styles = stylesResult.data.results;

          return this.getReviews(id);
        })
        .then((reviewMetaResult) => {
          result.data.reviews = reviewMetaResult;
          this.setState({
            product: result.data,
            haveProduct: true
          }), () => {
            console.log('this state product',this.state.product, this.state.product.id, this.state.product.name);
          }
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  getReviews(id) {
    var options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${JSON.stringify(id)}`,
      headers: {
        Authorization: token,
        accept: 'application/json',
        'content-type': 'application/json',
      }
    }
    return axios(options)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  }


  getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
  }


  clickTracker(e) {
    //console.log(e.target.localName, e.target.classList[e.target.classList.length - 1], this.getDateTime());

    var options = {
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
      headers: {
        // Authorization: token,
        Authorization: token,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        element: e.target.localName,
        widget: e.target.classList[e.target.classList.length - 1],
        time: this.getDateTime()
      }
    }

    axios(options)
    .then(result => {
      console.log('clicked', result);
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    return (<div className={this.state.darkmode === false ? 'app' : 'appdark'} onClick={this.clickTracker}>
      <button className='modetoggle' onClick={this.modeToggle}>{this.state.darkmode === false ? 'Toggle Dark Mode' : 'Toggle Light Mode'}</button>
      <GeneralProductInfo productid={this.state.id} product={this.state.product} productSelector={this.productSelector}/>
      <RelatedProducts darkMode={this.state.darkmode} clickTracker={this.clickTracker} product={this.state.product} productSelector={this.productSelector} getReviews={this.getReviews} />
      <Outfits darkMode={this.state.darkmode} clickTracker={this.clickTracker} product={this.state.product} productSelector={this.productSelector}/>
      <Questionapp clickTracker={this.clickTracker} product={this.state.product}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
