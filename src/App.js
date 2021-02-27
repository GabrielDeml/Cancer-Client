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

  async testML(imgRef) {
    // const mobilenet = require('@tensorflow-models/mobilenet');
    // Get the image reference
    const img = tf.browser.fromPixels(imgRef.current);
    // Convert the image to a 4d tensor
    const smallImg = tf.image.resizeBilinear(img, [224, 224]);
    const resized = tf.cast(smallImg, 'float32');
    const t4d = tf.tensor4d(Array.from(resized.dataSync()), [1, 224, 224, 3])
    // Load the model.
    const model = await tf.loadLayersModel('https://gabrieldeml.github.io/Cancer-Client/models/model.json');
    // Classify the image.
    const predictions = model.predict(t4d);
    // Get the output
    const value = predictions.dataSync()
    console.log('Predictions: ');
    console.log(value);
    // Display the output of the classification
    if (value[0] == 0) {
      this.setState({ msg: 'malignant' })
    } else {
      this.setState({ msg: 'Benign' })
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
          <h1>This is not medical advice it just is a test</h1>
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
