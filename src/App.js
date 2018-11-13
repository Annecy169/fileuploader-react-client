import React from 'react'
import './App.css';
const axios = require("axios");

class ReactUploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null,
      preview: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
      }
    };
    axios.post("http://localhost:8000/upload",formData,config)
      .then((response) => {
          alert("The file is successfully uploaded", response);
          window.location.reload();
      }).catch((error) => {
        alert("Error Uploading" + error);
    });
  }
  handleChange(e) {
    var targetFile = e.target.files[0];
    this.setState({file:targetFile});
    this.setState({
      preview: URL.createObjectURL(targetFile)
    })
  }

  render() {
    return (
      <div class="App">
        <div class="bg-block"></div>
        <h1 class="Title" >File Up<span class="white">loader</span></h1>
        <form class="uploader" onSubmit={this.onFormSubmit}>
        
        <div class="file-upload-wrapper">
          <input class="file" type="file" name="myImage" onChange= {this.handleChange} />
        </div>  

        <div class="image-frame">  
          <img class="image-holder" src={this.state.preview} alt="preview"/>
        </div>
        <input class="submit" type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default ReactUploadImage