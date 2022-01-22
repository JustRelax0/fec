import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from '../overview/overviewcomponents/starRating.jsx';


var Comparing = (props) => {

  var onActionClick = () => {
    props.hide();
  }

  if (!props.show) {
    return null;
  }

  var features = [];
  var productFeature;

  // add features
  for (var i = 0; i < props.previewProduct.features.length; i++) {
    if (props.previewProduct.features[i].value === null) {
      productFeature = props.previewProduct.features[i].feature;
    } else {
      productFeature = `${props.previewProduct.features[i].value} ${props.previewProduct.features[i].feature}`;
    }

    features.push([productFeature, true, false]);
  }

  for (var i = 0; i < props.relatedProduct.features.length; i++) {
    if (props.relatedProduct.features[i].value === null) {
      productFeature = props.relatedProduct.features[i].feature;
    } else {
      productFeature = `${props.relatedProduct.features[i].value} ${props.relatedProduct.features[i].feature}`;
    }

    var wasFoundAtIndex = features.indexOf([productFeature, true, false]);
    if (wasFoundAtIndex !== -1) {
      features[wasFoundAtIndex] = [productFeature, true, true];
    } else {
      features.push([productFeature, false, true]);
    }
  }

  console.log('features table: ');
  console.log(props.previewProduct.reviews);
  console.log(props.relatedProduct.reviews);


  var displayCheckMarkIf = (included, side) => {
    if (included) {
      if (side === 'left') {
        return (<span className="modal-body-left relatedProductCards">&#10004;</span>);
      } else {
        return (<span className="modal-body-right relatedProductCards">&#10004;</span>);
      }
    } else {
      if (side === 'left') {
        return (<span className="modal-body-left relatedProductCards">&nbsp;</span>);
      } else {
        return (<span className="modal-body-right relatedProductCards">&nbsp;</span>);
      }

    }
  }
  var renderComparisonTable = features.map( (detail) => {
    return(
      <div className="modal-body-detail relatedProductCards">
        {displayCheckMarkIf(detail[1], 'left')}
        <span className="modal-body-middle relatedProductCards">{detail[0]}</span>
        {displayCheckMarkIf(detail[2], 'right')}
        <br/> <br />
      </div>
    )}
  )




  return (
    <div className="modal relatedProductCards" onClick={onActionClick}>
      <div className="modal-action relatedProductCards" onClick={onActionClick}>&#9733;</div>
      <div className = {props.darkMode === false ? "modal-content relatedProductCards" : "modal-content-dark relatedProductCards"}>
        <div className="modal-header relatedProductCards">
          <h5 className="modal-title relatedProductCards">Comparing</h5>
          <div className="modal-products relatedProductCards">
            <h4 className="modal-leftName relatedProductCards">{props.previewProduct.name}</h4>
            <h4 className="modal-rightName relatedProductCards">{props.relatedProduct.name}</h4>
          </div>
        </div>
        <div className="modal-body relatedProductCards">
          {/* <CompareTable compareTable={features}/> */}
          {renderComparisonTable}
          <div className="modal-body-detail relatedProductCards">
            <span className = "modal-body-leftRating relatedProductCards">
              <StarRating reviews={props.relatedProduct.reviews}/>
            </span>
            <span className = "modal-body-middle relatedProductCards">Rating</span>
            <span className = "modal-body-rightRating relatedProductCards">
              <StarRating reviews={props.relatedProduct.reviews}/>
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Comparing;