import React from 'react'
const axios = require("axios");

class ReactUploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
      }).catch((error) => {
        alert("Error Uploading" + error);
    });
  }
  onChange(e) {
    this.setState({file:e.target.files[0]});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange= {this.onChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default ReactUploadImage