import React from 'react';
import token from '../../../config.js';
// const axios = require('axios');
import axios from 'axios';
import GallerySideBar from './GallerySideBar.jsx';
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      expanded: false
    }
  }
  componentDidUpdate(prevProps, prevState) {
    //this.props.currentStyle.style_id
    if (this.props.currentStyle.style_id !== prevProps.currentStyle.style_id) {
      this.setState({
        photoIndex: 0,
        expanded: false
      })
    }

  }

  scrollGallery(e) {
    e.preventDefault();
    if (e.target.value === 'Right') {
      if (this.state.photoIndex === this.props.currentStyle.photos.length - 1) {
        this.setState({
          photoIndex: 0
        });
      } else {
        this.setState({
          photoIndex: this.state.photoIndex + 1
        });
      }
    } else {
      if (this.state.photoIndex === 0) {
        this.setState({
          photoIndex: this.props.currentStyle.photos.length - 1
        });
      } else {
        this.setState({
          photoIndex: this.state.photoIndex - 1
        });
      }
    }
  }
  changePhoto(newPhotoIndex) {
    if (newPhotoIndex !== undefined) {
      this.setState({
        photoIndex: newPhotoIndex
      })
    }
  }
  expand(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    })
  }
  render() {

    //this.props.currentStyle.style_id

    var photoURL;
    var photoIndex = this.state.photoIndex;
    var galleryImage;
    if (this.props.currentStyle.photos !== undefined) {
      if(this.props.currentStyle.photos.length <= this.state.photoIndex) {
        photoIndex = this.props.currentStyle.photos.length - 1;
      }
      photoURL = this.props.currentStyle.photos[photoIndex].url;

      galleryImage = <img className={this.state.expanded ? "gallery-main-image-expanded overview" : "gallery-main-image overview"} src={photoURL}></img>

    }

    return (
      <div className={this.state.expanded ? "gallery-expanded overview" : "gallery overview"}>
        <button className="toggle-expanded-button overview" onClick={this.expand.bind(this)}>{this.state.expanded? "collapse" : "expand"}</button>
      {galleryImage}
      <GallerySideBar currentStyle={this.props.currentStyle} changePhoto={this.changePhoto.bind(this)}/>
      <button value="Left" onClick={this.scrollGallery.bind(this)} className="gallery-scroll-button scroll-left overview">&lt;</button>
      <button value="Right" onClick={this.scrollGallery.bind(this)} className="gallery-scroll-button scroll-right overview">&gt;</button>
      </div>


    )
  }
};
/**/
export default Gallery;