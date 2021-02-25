import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
import * as tf from '@tensorflow/tfjs'

import { Button } from '@material-ui/core';


async function runNeuralNetwork() {
    const mobilenet = require('@tensorflow-models/mobilenet');

    const img = document.getElementById('img');

    // Load the model.
    const model = await mobilenet.load();

    // Classify the image.
    const predictions = await model.classify(img);

    console.log('Predictions: ');
    console.log(predictions);
}

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Main page</h1>
                <img ref={"img"}></img>
                <Button variant="contained" onClick={() => { alert('clicked') }}>Run Neural </Button>
            </header>
        </div>
    );
}

export default Home;
