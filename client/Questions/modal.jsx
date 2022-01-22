import React from 'react';
import axios from 'axios';
import token from '../../config.js';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.inputChange = this.inputChange.bind(this);
    this.mandatoryAreFilled = this.mandatoryAreFilled.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.submit = this.submit.bind(this);
    this.close = this.close.bind(this);
  }

  inputChange(e) {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  mandatoryAreFilled(text) {
    if (text === '') {
      return false;
    } else {
      return true;
    }
  }

  emailIsValid(email) {
    if ((email.substring(email.length - 4, email.length) === '.com' || email.substring(email.length - 4, email.length) === '.org') && email.includes('@')) {
      return true;
    } else {
      return false;
    }
  }


  submit(e) {
    e.preventDefault();
    if (this.mandatoryAreFilled(this.state.question) && this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      var options = {
        method: 'post',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions`,
        headers: {
          Authorization: token
        },
        data: {
          "body": this.state.question,
          "name": this.state.nickname,
          "email": this.state.email,
          "product_id": Number(this.props.productid)
        }
      }

      // console.log(options);
      axios(options)
      .then(result => {
        // console.log(result);
        alert('submission successful');
        this.props.modalToggle(e);
      })
      .catch(err => {
        alert(err);
      });
    } else if (this.mandatoryAreFilled(this.state.question) && !this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Nickname and Your Email');
    } else if (!this.mandatoryAreFilled(this.state.question) && !this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Question and Your Nickname');
    } else if (!this.mandatoryAreFilled(this.state.question) && this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Question and Your Email');
    } else if (!this.mandatoryAreFilled(this.state.question) && this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Question');
    } else if (this.mandatoryAreFilled(this.state.question) && !this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Nickname');
    } else if (this.mandatoryAreFilled(this.state.question) && this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Email');
    } else if (!this.mandatoryAreFilled(this.state.question) && !this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      alert('You must enter the following: Your Question and Your Nickname and Your Email');
    }
  }

  close(e) {
    e.preventDefault();
    this.props.modalToggle(e);
  }

  componentDidMount() {
    this.setState({
      question: '',
      nickname: '',
      email: ''
    });
  }

  render() {
    if (this.props.showModal === false) {
      return null;
    }
    return (<div className='qmodal QuestionsAndAnswers'>
      <span className='modalclose QuestionsAndAnswers' onClick={this.close}>X</span>
      <span className='QuestionsAndAnswers'>
      <h1 className='modaltitle QuestionsAndAnswers'>Ask Your Question</h1>
      </span>
      <h5 className='modalsubtitle QuestionsAndAnswers'>About the {this.props.productname}</h5>
      <div className='QuestionsAndAnswers'>
        <span className='QuestionsAndAnswers'>Your Question </span>
        <span className='required QuestionsAndAnswers'>*</span>
      </div>
      <textarea rows='20' cols='50' className='modalquestion QuestionsAndAnswers' name='question' maxLength='1000' onChange={this.inputChange} value={this.state.question || ''}></textarea>
      <div className='modalnicknameheader QuestionsAndAnswers'>
        <span className='QuestionsAndAnswers'>Your Nickname </span>
        <span className='required QuestionsAndAnswers'>*</span>
      </div>
      <textarea placeholder='Example: jackson11!' rows='20' cols='50' className='modalnickname QuestionsAndAnswers' name='nickname' maxLength='60' onChange={this.inputChange} value={this.state.nickname || ''}></textarea>
      <div className='modalwarning QuestionsAndAnswers'>For privacy reasons, do not use your full name or email address</div>
      <div className='QuestionsAndAnswers'>
        <span className='QuestionsAndAnswers'>Your Email </span>
        <span className='required QuestionsAndAnswers'>*</span>
      </div>
      <textarea placeholder='Why did you like the product or not?' rows='20' cols='50' className='modalemail QuestionsAndAnswers' name='email' maxLength='60' onChange={this.inputChange} value={this.state.email || ''}></textarea>
      <div className='modalwarning2 QuestionsAndAnswers'>For authentication reasons, you will not be emailed</div>
      <button onClick={this.submit} className='modalsubmit QuestionsAndAnswers'>Submit</button>
    </div>
    );
  }
}

export default Modal;