import React from 'react';
import logo from './logo.svg';
import cat from './cat.jpeg';
import './App.css';


import * as tf from '@tensorflow/tfjs';

async function testML(imgRef) {


  const mobilenet = require('@tensorflow-models/mobilenet');

  const img = imgRef.current;

  // Load the model.
  const model = await mobilenet.load();

  // Classify the image.
  const predictions = await model.classify(img);

  console.log('Predictions: ');
  console.log(predictions);
}

function App() {
  const imgRef = React.createRef();
  return (
    <div className="App">
      <header className="App-header">
        <img src={cat} ref={imgRef} />
        <button onClick={() => testML(imgRef)}>Press me</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
