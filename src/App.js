import React from 'react'
import './App.css';
const axios = require("axios");

class ReactUploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null,
      preview: "./no-image-available.png",
      name: "Drag and drop or Select a file"
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  onFormSubmit = async e => {
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
    try {
      const res = await axios.post("http://localhost:8000/upload",formData,config)
      alert("The file is successfully uploaded", res);
      window.location.reload();
    } catch(err) {
      alert("Error Uploading" + err);
    }
  }
  handleChange(e) {
    const filename = e.target.files[0].name;
    const targetFile = e.target.files[0];
    this.setState({file:targetFile});
    var targetURL = URL.createObjectURL(e.target.files[0])
    this.setState({preview:targetURL});
    this.setState({name:filename});
  }

  render() {
    return (
      <div class="App">
        <div class="bg-block"></div>
        <h1 class="Title" >File Up<span class="white">loader</span></h1>
        <form class="uploader" onSubmit={this.onFormSubmit}>
        
        <div class="file-upload-wrapper" data-content={this.state.name}>
          <input class="file" type="file" name="myImage" onChange= {this.handleChange} />
        </div>  

        <div class="image-frame">  
          <img class="image-holder" src={this.state.preview} alt="preview"/>
        </div>
        <input class="submit" type="submit" value="Upload" />
      </form>
      </div>
    )
  }
}

export default ReactUploadImage