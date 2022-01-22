import React from 'react';

class StarRating extends React.Component {

  constructor (props) {
    super(props)
  }

  render() {

    var rating = 0;
    var numratings = 0;
    var average = 0;
    var stars = [];
    if (this.props.reviews !== undefined) {
      rating = 0;
      numratings = 0;
      for (var i in this.props.reviews.ratings) {
        rating += i * parseInt(this.props.reviews.ratings[i]);
        numratings += parseInt(this.props.reviews.ratings[i]);
      }
      average = Math.floor((rating/numratings) * 10) / 10;
    }


    for (var i = 0; i < 5; i++) {
      if (i < Math.floor(average)) {
        stars.push(<span className="star on overview"></span>)
      } else  if (i > Math.floor(average)) {
        stars.push(<span className="star overview"></span>)
      } else  if (i === Math.floor(average)){
        var remainder = (average * 10) % 10;
        if (remainder < 3) {
          stars.push(<span className="star overview"></span>)
        } else if (remainder >= 3 && remainder < 5) {
          stars.push(<span className="star quarter overview"></span>)
        } else if (remainder >= 5 && remainder < 7) {
          stars.push(<span className="star half overview"></span>)
        } else if (remainder >= 7 && remainder <= 9) {
          stars.push(<span className="star threequarter overview"></span>)
        } else {
          stars.push(<span className="star on overview"></span>)
        }
      }
    }

    var totalReviewsSpan = <span className="total-reviews overview">{numratings}</span>

    return (
      <div className="stars">
        {stars}
        {totalReviewsSpan}
      </div>
    );
  }
}

export default StarRating;