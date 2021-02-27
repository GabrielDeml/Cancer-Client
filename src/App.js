import React, { Component } from 'react'
import logo from './logo.svg';
import cat from './test.jpg';
import './App.css';


import * as tf from '@tensorflow/tfjs';



class App extends Component {

  constructor(props) {
    super(props)

    // Set initial state 
    this.state = { msg: '' }

    // Binding this keyword 
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    // Changing state 
    this.setState({ msg: '' })
  }

  // TODO: Figure out why this isn't being deffined
  async testML(imgRef) {


    const mobilenet = require('@tensorflow-models/mobilenet');

    const img = tf.browser.fromPixels(imgRef.current);

    const smalImg = tf.image.resizeBilinear(img, [224, 224]);
    const resized = tf.cast(smalImg, 'float32');
    const t4d = tf.tensor4d(Array.from(resized.dataSync()), [1, 224, 224, 3])
    // img.reshape(1, 224, 224, 3)

    // Load the model.
    // const model = await mobilenet.load();
    const model = await tf.loadLayersModel('http://localhost:8080/model.json');


    // Classify the image.
    const predictions = model.predict(t4d);

    const value = predictions.dataSync()
    // TODO show user the output of the predcition
    console.log('Predictions: ');
    console.log(value);
    if (value[0] == 0) {
      this.setState({ msg: 'No Cancer' })
    } else {
      this.setState({ msg: 'Cancer found' })
    }
  }

  render() {
    const imgRef = React.createRef();
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = imgRef;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <input type="file" accept="image/*" onChange={handleImageUpload} ref={imgRef} multiple="false" />
          <img src={cat} ref={imgRef} />
          <button onClick={() => this.testML(imgRef)}>Run model</button>
          <p>{this.state.msg}</p>
        </header>
      </div>
    );
  }
}

export default App;
