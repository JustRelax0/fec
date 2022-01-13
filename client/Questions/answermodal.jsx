import React from 'react';
import ImageUploader from 'react-image-uploader';
import token from '../../config.js';
import axios from 'axios';

class Answermodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCount: 0,
      addFileClass: 'addFileTrue',
      images: []
    };
    this.close= this.close.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.mandatoryAreFilled = this.mandatoryAreFilled.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.submit = this.submit.bind(this);
    this.imagesAreValid = this.imagesAreValid.bind(this);
  }

  imagesAreValid(imageArray) {
    if(imageArray.length === 0) {
      return true;
    }
    var valid = true;
    for (var i = 0; i < imageArray.length; i ++) {
      if (imageArray[i].substring(imageArray[i].length - 4, imageArray[i].length) !== '.jpg' && imageArray[i].substring(imageArray[i].length - 4, imageArray[i].length) !== '.png' && imageArray[i].substring(imageArray[i].length - 4, imageArray[i].length) !== '.gif') {
        valid = false;
      }
    }

    return valid;
  }

  imageChange (e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({image: e.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  uploadImage(e) {
    e.preventDefault();
    if(this.state.image && this.state.imageCount < 4) {
      var formData = new FormData();
      formData.append('file', this.state.image);
      formData.append('upload_preset', 'ovajzq8x');
      var options = {
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/domfdxk5r/upload',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      };

      axios(options)
      .then(result => {
        this.setState({
          images: [...this.state.images, result.data.secure_url],
          currentImage: result.data.secure_url,
          imageCount: this.state.imageCount + 1
        }, () => {
          console.log(this.state.images);
          alert('Image upload successful');
        });
      })
      .catch(err => {
        console.log(err);
      });
    } else if (this.state.image && this.state.imageCount >= 4) {
      this.setState({
        addFileClass: 'addFileFalse'
      }, () => {
        alert('Maximum number of photos have been uploaded, you may not upload any additional photos after this one');
      })
    }
  }

  inputChange(e) {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  close(e) {
    e.preventDefault();
    this.setState({
      images: [],
      imageCount: 0,
      addFileClass: 'addFileTrue'
    }, this.props.answerModalToggle(this.props.currentQuestion))

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
    if (this.mandatoryAreFilled(this.state.answer) && this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        var options = {
          method: 'post',
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${Number(this.props.currentQuestionId)}/answers`,
          headers: {
            Authorization: token
          },
          data: {
            "body": this.state.answer,
            "name": this.state.nickname,
            "email": this.state.email,
            "photos": this.state.images
          }
        }
        axios(options)
        .then(result => {
          alert('Submission successful');
          this.props.answerModalToggle(this.props.currentQuestion, this.props.currentQuestionId, this.props.get);
        })
        .catch(err => {
          alert(err);
        });
      } else {
        alert('Please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (this.mandatoryAreFilled(this.state.answer) && !this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Nickname and Your Email');
      } else {
        alert('You must enter the following: Your Nickname and Your Email. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (!this.mandatoryAreFilled(this.state.answer) && !this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Answer and Your Nickname');
      } else {
        alert('You must enter the following: Your Answer and Your Nickname. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (!this.mandatoryAreFilled(this.state.answer) && this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Answer and Your Email');
      } else {
        alert('You must enter the following: Your Answer and Your Email. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (!this.mandatoryAreFilled(this.state.answer) && this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Answer');
      } else {
        alert('You must enter the following: Your Answer. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (this.mandatoryAreFilled(this.state.answer) && !this.mandatoryAreFilled(this.state.nickname) && this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Nickname');
      } else {
        alert('You must enter the following: Your Nickname. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (this.mandatoryAreFilled(this.state.answer) && this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Email');
      } else {
        alert('You must enter the following: Your Email. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    } else if (!this.mandatoryAreFilled(this.state.answer) && !this.mandatoryAreFilled(this.state.nickname) && !this.emailIsValid(this.state.email)) {
      if(this.imagesAreValid(this.state.images)) {
        alert('You must enter the following: Your Answer and Your Nickname and Your Email');
      } else {
        alert('You must enter the following: Your Answer and Your Nickname and Your Email. Also, please ensure that your uploaded photos are of the following accepted types: .png, .gif, or .jpeg');
      }
    }
  }

  render() {
    if (this.props.showAnswerModal === false) {
      return null;
    }
    return (<div className='answermodal'>
      <img className='image' src={this.state.currentImage} />
      <span className='answermodalclose' onClick={this.close}>X</span>
      <span>
      <h1>Submit your Answer</h1>
      </span>
      <h5>{this.props.productname}: {this.props.currentQuestion}</h5>
      <div>Your Answer *</div>
      <textarea rows='20' cols='50' className='answermodalanswer' name='answer' maxLength='1000' onChange={this.inputChange} value={this.state.answer || ''}></textarea>
      <div className='answermodalnicknameheader'>Your Nickname *</div>
      <textarea placeholder='Example: jackson11!' rows='20' cols='50' className='answermodalnickname' name='nickname' maxLength='60' onChange={this.inputChange} value={this.state.nickname || ''}></textarea>
      <div className='answermodalwarning'>For privacy reasons, do not use your full name or email address</div>
      <div>Your Email *</div>
      <textarea placeholder='Why did you like the product or not?' rows='20' cols='50' className='answermodalemail' name='email' maxLength='60' onChange={this.inputChange} value={this.state.email || ''}></textarea>
      <div className='answermodalwarning2'>For authentication reasons, you will not be emailed</div>
      <span>Upload your photos<input type='file'
       className={this.state.addFileClass} name='photo'
       accept='image/png, image/jpeg, image/gif' onChange={this.imageChange}/></span>
      <button className={this.state.addFileClass} onClick={this.uploadImage}>Submit Photo</button>
      <span><button onClick={this.submit}>Submit Answer</button></span>
    </div>
    );
  }

  // render() {
  //   if (this.props.showModal === false) {
  //     return null;
  //   }
  //   return (<div className='modal'>
  //     <span className='modalclose' onClick={this.close}>X</span>
  //     <span>
  //     <h1>Ask Your Question</h1>
  //     </span>
  //     <h5>About the {this.props.productname}</h5>
  //     <div>Your Question *</div>
  //     <textarea rows='20' cols='50' className='modalquestion' name='question' maxLength='1000' onChange={this.inputChange} value={this.state.question || ''}></textarea>
  //     <div className='modalnicknameheader'>Your Nickname *</div>
  //     <textarea placeholder='Example: jackson11!' rows='20' cols='50' className='modalnickname' name='nickname' maxLength='60' onChange={this.inputChange} value={this.state.nickname || ''}></textarea>
  //     <div className='modalwarning'>For privacy reasons, do not use your full name or email address</div>

      // <div>Your Email *</div>
      // <textarea placeholder='Why did you like the product or not?' rows='20' cols='50' className='modalemail' name='email' maxLength='60' onChange={this.inputChange} value={this.state.email || ''}></textarea>
      // <div className='modalwarning2'>For authentication reasons, you will not be emailed</div>

  //     <button onClick={this.submit}className='modalsubmit'>Submit</button>
  //   </div>
  //   );
  // }
}

export default Answermodal;