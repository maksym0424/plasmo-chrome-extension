import React, { useEffect, useState } from "react";
import { Visualizer } from "react-sound-visualizer";

function AudioVisualizer() {
  const [audio, setAudio] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(setAudio);

    return () => {
      if (audio) {
        audio.getTracks().forEach((track) => track.stop());
      }
    }
  }, []);

  return (
    <Visualizer audio={audio}>
      {({ canvasRef, stop, start, reset }) => (
        <>
          <canvas ref={canvasRef} width={500} height={100} />

          <div>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
          </div>
        </>
      )}
    </Visualizer>
  );
}

export default AudioVisualizer;
