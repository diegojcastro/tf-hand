import { React, useState, useEffect } from 'react';
import './App.css';



function App() {
  const handpose = require('@tensorflow-models/handpose');
  require('@tensorflow/tfjs-backend-webgl');
  const [playing, setPlaying] = useState(false);
  const [preds, setPreds] = useState([]);
  const [model, setModel] = useState(null);

  const HEIGHT = 500;
  const WIDTH = 500;

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true
      }, 
      (stream) => {
        let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
      },
      (err) => console.log(err)
    );
  };

  const stopVideo = () => {
    setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks()[0].stop();
  }

  async function startHandPose() {
    // Load the MediaPipe handpose model.
    // const model = await handpose.load();

    // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
    // hand prediction from the MediaPipe graph.
    const video = document.querySelector('video');
    console.log(video);
    video.onloadeddata = async (event) => { 
      console.log("video data loaded, we're in"); 
      const predictions = await model.estimateHands(document.querySelector("video"));
      console.log(predictions);
      if (predictions.length > 0) {
        /*
        `predictions` is an array of objects describing each detected hand, for example:
        [
          {
            handInViewConfidence: 1, // The probability of a hand being present.
            boundingBox: { // The bounding box surrounding the hand.
              topLeft: [162.91, -17.42],
              bottomRight: [548.56, 368.23],
            },
            landmarks: [ // The 3D coordinates of each hand landmark.
              [472.52, 298.59, 0.00],
              [412.80, 315.64, -6.18],
              ...
            ],
            annotations: { // Semantic groupings of the `landmarks` coordinates.
              thumb: [
                [412.80, 315.64, -6.18]
                [350.02, 298.38, -7.14],
                ...
              ],
              ...
            }
          }
        ]
        */
    
        for (let i = 0; i < predictions.length; i++) {
          const keypoints = predictions[i].landmarks;
    
          // Log hand keypoints.
          for (let i = 0; i < keypoints.length; i++) {
            const [x, y, z] = keypoints[i];
            console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          }
        }
      }
    }
  }

  useEffect(() => {
    const modelLoader = async () => {
      setModel(await handpose.load());
    }
    if (model === null) modelLoader();
  }, [playing])

  useEffect(() => {
    if (model) {
      console.log("This is model:");
      console.log(model);
      startHandPose();
    }
  }, [model])


  return (
    <div className="app">
      <div className="app__container">
        <video
          height={HEIGHT}
          width={WIDTH}
          muted
          autoPlay
          className="app__videoFeed"
        />
      </div>
      <div className="app__buttons">
        {playing ? (
            <button onClick={stopVideo}>Stop</button>
          ) : (
            <button onClick={startVideo}>Start</button>
          )}
      </div>
    </div>
  );
}

export default App;
