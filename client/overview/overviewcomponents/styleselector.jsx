import React from 'react';
import token from '../../../config.js';

import axios from 'axios';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //this.props.styles[0].style_id
    if (this.props.styles.length !== 0 && prevProps.styles.length !== 0) {
      if (this.props.styles[0].style_id !== prevProps.styles[0].style_id) {
        this.setState({
          selectedStyle: 0
        })
      }
    }

  }

  styleButtonClick(e) {
    e.preventDefault();
    var styleClicked = this.findStyle(e.target.alt);
    this.props.updateGallery(styleClicked.returnStyle);
    this.setState({
      selectedStyle: styleClicked.styleIndex
    });
  }

  findStyle(name) {
    var returnStyle = 'error';
    var i = 0;
    var styleIndex;
    this.props.styles.forEach(style => {
      if (style.name === name) {
        returnStyle = style;
        styleIndex = i;
      }
      i++;
    });
    return {returnStyle, styleIndex};
  }

  render() {

    //this.props.styles[0].style_id

    var stylesArray = [];
    for (var i = 0; i < this.props.styles.length / 4; i++) {
      stylesArray[i] = this.props.styles.slice(i * 4, (i+1) * 4);
    }

    var styleIndex = this.state.selectedStyle;

    if (styleIndex >= this.props.styles.length) {
      styleIndex = this.props.styles.length - 1;
    }

    var createStyleTD = (style) => {
      var isSelected = false;

      if (this.props.styles[styleIndex].name === style.name) {
        isSelected = true;
      }

      //console.log(style.photos[0].thumbnail_url);
      return <td className="table-data overview" onClick={this.styleButtonClick.bind(this)}>
        <div className="mask overview">
          <img className={(isSelected ? "selected-style" : "non-selected-style") + " style-button overview"} alt={style.name} src={style.photos[0].thumbnail_url}></img>
        </div>
      </td>
    }


    var styleTable = [];
    styleTable = <table>
      <tbody>{
        stylesArray.map(arrayOf4Styles => (
          <tr>{
            arrayOf4Styles.map(style => {
              return createStyleTD(style)
            })
          }</tr>
        ))
      }</tbody>
    </table>

    var styleNameSpan;
    if (this.props.styles.length !== 0) {
      styleNameSpan = <span className="style-name overview">{this.props.styles[styleIndex].name}</span>
    }

    return (
      <div className="style-selector overview">
        {styleTable}
        {styleNameSpan}
      </div>
    )
  }
};

/*

*/


export default StyleSelector;