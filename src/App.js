import React from 'react';
import logo from './logo.svg';
import cat from './test.jpg';
import './App.css';


import * as tf from '@tensorflow/tfjs';

async function testML(imgRef) {


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
}

function App() {
  const imgRef = React.createRef();
  return (
    <div className="App">
      <header className="App-header">
        // TODO make it so user can upload an image
        <img src={cat} ref={imgRef} />
        <button onClick={() => testML(imgRef)}>Run model</button>
      </header>
    </div>
  );
}

export default App;
