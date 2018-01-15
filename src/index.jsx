import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import { post } from 'axios';
import { Line } from 'rc-progress';

class App extends Component {
  state = {
    percent: 0
  };

  onDrop = files => {
    this.setState({ percent: 0 });
    let data = new FormData();
    files.forEach(file => {
      data.append('files[]', file, file.name);
    });

    const url = 'http://localhost:3001';

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: progressEvent => {
        var percent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        if (percent >= 100) {
          this.setState({ percent: 100 });
        } else {
          this.setState({ percent });
        }
      }
    };

    const that = this;
    post(url, data, config)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
        that.setState({ percent: 0 });
      });
  };

  render() {
    const divStyle = {
      border: '1px solid black'
    };
    return (
      <div style={divStyle}>
        <Dropzone onDrop={this.onDrop} className='dropzone-box'>
          <div>Try dropping some files here, or click to select files to upload. {this.state.percent}</div>
          <Line percent={this.state.percent} strokeWidth='1' strokeColor='#2db7f5' strokeLinecap='square' />
        </Dropzone>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
