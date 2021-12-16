import React from 'react';
import token from '../../config.js';
import axios from 'axios';
import sample from '../../sampledata.js';
import Question from './question.jsx';
import Promise from 'bluebird';

class Questionslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      productid: '59555',
      bStyle: 'none',
      expanded: false
    };
    this.get = this.get.bind(this);
    // this.post = this.post.bind(this);
    this.sortHelpfulness = this.sortHelpfulness.bind(this);
    this.toggleQuestions = this.toggleQuestions.bind(this);
    this.arrayShortener = this.arrayShortener.bind(this);
  }

  arrayShortener(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i ++) {
      if (i === 0 || i === 1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  toggleQuestions(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    })
  }

  sortHelpfulness(arr) {
    var zeroesArray = [];

    for (var i = 0; i < arr.length; i ++) {
      if (arr[i].question_helpfulness === 0) {
        zeroesArray.push(arr[i]);
        arr.splice(i, 1);
      }
    }

    arr.sort((a, b) => (a.question_helpfulness) - (b.question_helpfulness));
    arr.reverse();

    for (var i = 0; i < zeroesArray.length; i ++) {
      arr.push(zeroesArray[i]);
    }
    return arr;
  }
  // post() {
  //   var options = {
  //     method: 'post',
  //     url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp32/qa/questions',
  //     data: {
  //       body: 'testquestion',
  //       name: 'testusername',
  //       email: 'testemail',
  //       product_id: 0
  //     },
  //     headers: {
  //       Authorization: token,
  //       accept: 'application/json',
  //       'content-type': 'application/json'
  //     }
  //   }

  //   axios(options)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  get() {
    var options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=' + this.state.productid,
      headers: {
        Authorization: token,
        accept: 'application/json',
        'content-type': 'application/json',
      }
    }

    axios(options)
    .then(result => {
      this.setState({
        questions: this.sortHelpfulness(result.data.results)
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    //on page load, only display up to 2 questions and 2 answers per question
    this.get();
  }

  render() {
    if (this.state.questions.length === 0) {
      return(<button>Submit new question</button>);
    } else if (this.state.questions.length > 2 && this.state.expanded === false) {
    return (<div>
      <input placeholder='Search for a question'/>
      <button>Search</button>
      <h1>Product ID</h1>
      <div>{this.state.productid}</div>
      {this.arrayShortener(this.state.questions).map(question => (
        <Question key={this.state.questions.indexOf(question)} index={this.state.questions.indexOf(question)} answers={question.answers} product_id={this.state.productid} asker_name={question.asker_name} question_body={question.question_body} question_date={question.question_date} question_helpfulness={question.question_helpfulness} question_id={question.question_id} reported={JSON.stringify(question.reported)} />
      ))}
      <button onClick={this.toggleQuestions}>More Answered Questions</button>
      <button>Submit new question</button>
    </div>);
    } else if (this.state.questions.length > 2 && this.state.expanded === true) {
      return (<div>
        <input placeholder='Search for a question'/>
        <button>Search</button>
        <h1>Product ID</h1>
        <div>{this.state.productid}</div>
        {this.state.questions.map(question => (
          <Question key={this.state.questions.indexOf(question)} index={this.state.questions.indexOf(question)} answers={question.answers} product_id={this.state.productid} asker_name={question.asker_name} question_body={question.question_body} question_date={question.question_date} question_helpfulness={question.question_helpfulness} question_id={question.question_id} reported={JSON.stringify(question.reported)} />
        ))}
        <button onClick={this.toggleQuestions}>Collapse questions</button>
        <button>Submit new question</button>
      </div>);
    }

  }
}

export default Questionslist;