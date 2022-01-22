import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Outfit from './Outfit.jsx';
import token from '../../config.js';
import CarouselButtons from './CarouselButtons.jsx';

class Outfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      wardrobe: [],
      length: 0,
      activeCarousel: 0,
    }
   this.onAddClick = this.onAddClick.bind(this);
   this.onDeleteClick = this.onDeleteClick.bind(this);
   this.updateCarousel = this.updateCarousel.bind(this);

  };


  onAddClick(e) {
    var newOutfit = this.props.product;
    var wardrobe = [...this.state.wardrobe];

    if (!wardrobe.includes(newOutfit)) {
      wardrobe.push(newOutfit);

      this.setState({
        wardrobe: wardrobe,
        length: wardrobe.length
      });
    } else {
      console.log('outfit already exists');
    }
  }

  onDeleteClick(e) {

    var wardrobe = [...this.state.wardrobe];

    if (wardrobe.length === 1) {
      wardrobe.pop();
    } else {
      wardrobe.splice(e, 1);
    }

    this.setState({
      wardrobe: wardrobe,
      length: wardrobe.length
    });
  }


  updateCarousel(direction) {
    var newIndex = direction + this.state.activeCarousel;

    if (this.state.length === 0) {
      return;
    } else {
      if (newIndex < 0) {
        newIndex = 0;
        // console.log(newIndex);
      } else if (newIndex > this.state.length) {
        newIndex = this.state.length - 1;
        // console.log(newIndex);
      }

      this.setState({
        activeCarousel: newIndex,
      });
    }
  }

  // always render a Outfit add

  render() {

  // console.log('outfits props', this.state.wardrobe);
    return (
      <React.Fragment>
      <div className="carousel-title relatedProductCards">My Outfits</div>
      <div className="carousel relatedProductCards">
        <div className="carousel-buttons relatedProductCards">
          <CarouselButtons view={this.state.activeCarousel} updateCarousel={this.updateCarousel} darkMode = {this.props.darkMode}/>
        </div>
        <div className="carousel-inner relatedProductCards"
          style={{ transform: `translateX(-${(this.state.activeCarousel * 100)/5}%)` }}>


          <Outfit key = {0} defaultAdd = {true} action = {this.onAddClick} darkMode = {this.props.darkMode}/>

          { this.state.wardrobe.map((item, index) => (
              <Outfit
                key = {index + 1}
                index = {index}
                product = {item}
                action = {this.onDeleteClick}
                product_selection = {this.props.productSelector}
                darkMode = {this.props.darkMode}
                // add star rating later
              />
            ))
          }
        </div>
      </div>
      </React.Fragment>
    );
  //   }
  }
}

export default Outfits;