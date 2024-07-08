import React, { useState, useRef, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [laps,setLaps] = useState([])
  const intervalRef = useRef();

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  const handleLaps = ()=> {
    const lastLapTime = laps.length ? laps.reduce((acc, curr) => acc + curr, 0) : 0;
    const lapTime = time - lastLapTime;
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  }

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const getH = (ms) => ("0" + (Math.floor(ms / 1) % 100)).slice(-2);
  const getS = (ms) => ("0" + (Math.floor(ms / 100) % 60)).slice(-2);
  const getM = (ms) => ("0" + (Math.floor(ms / 100 / 60) % 60)).slice(-2);

  const formatTime = (ms) => `${getM(ms)}:${getS(ms)}:${getH(ms)}`;

  return (
    <>
      <p>{formatTime(time)}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLaps}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      <ul>
        {laps.map((lap,index)=>
        <li key={index}>{formatTime(lap)}</li>
        )}
      </ul>
    </>
  );
};

export default App;
