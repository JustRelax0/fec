import React from 'react';
import token from '../../../config.js';
// const axios = require('axios');
import axios from 'axios';
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
class GallerySideBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photoArrayIndex: 0
    }
  }
  scrollRight(e) {
    e.preventDefault();
    var prevIndex = this.state.photoArrayIndex + 1;
    this.setState({
      photoArrayIndex: prevIndex
    })
  }
  scrollLeft(e) {
    e.preventDefault();
    var prevIndex = this.state.photoArrayIndex - 1;
    this.setState({
      photoArrayIndex: prevIndex
    })
  }
  thumbnailClick(e) {
    e.preventDefault();
    this.props.changePhoto(e.target.alt);
  }
  render() {
    var photos = [];
    var thumbnails = [];
    /*
    for (var i = 0; i < this.props.styles.length / 4; i++) {
      stylesArray[i] = this.props.styles.slice(i * 4, (i+1) * 4);
    }
    */
    if (this.props.currentStyle.photos !== undefined) {
      for (var i = 0; i < this.props.currentStyle.photos.length / 7; i++) {
        photos[i] = this.props.currentStyle.photos.slice(i * 7, (i+1) * 7);
      }
      //photos = this.props.currentStyle.photos;
      for (var i in photos[this.state.photoArrayIndex]) {
        var alt_val = parseInt(i) + this.state.photoArrayIndex * 7;
        thumbnails.push(<img src={photos[this.state.photoArrayIndex][i].url} alt={alt_val} className="sidebar-thumbnail overview"></img>);
      }
      var scrollRight = [];
      if (this.state.photoArrayIndex < photos.length - 1) {
        scrollRight = <button className="scroll-button scroll-right overview" onClick={this.scrollRight.bind(this)}>Scroll Right</button>
      }
      var scrollLeft = [];
      if (this.state.photoArrayIndex !== 0) {
        scrollLeft = <button className="scroll-button scroll-Left overview" onClick={this.scrollLeft.bind(this)}>Scroll Left</button>
      }
    }
    return (
      <div className="gallery-sidebar overview">
        {scrollLeft}
        <div onClick={this.thumbnailClick.bind(this)} className="thumbnail-scroller overview">{thumbnails} </div>
        {scrollRight}
      </div>
    )
  }
}
export default GallerySideBar;