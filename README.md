This is clinical note generation chrome extension bulit-in plasmo + react + WebRTC for audio processing.
Back-End Repository: [https://github.com/maksym0424/whipser-real-time-asr-llama3](https://github.com/maksym0424/whipser-real-time-asr-llama3)

# Introduction
This is a MVP version of clinical note generation platform(something similar to [nable.com](https://www.nabla.com/)).
When doctor and patient having a consultation, this extension will show you transcription in real-time, and after consultation ended, it will generate clinical note automatically for doctor.

# Core functions

1. Real-Time speech recognition, using WebRTC interacting with Whisper model deployed on AWS GPU Instance.
   
2. Clinical note generation after consultation ended, interacting with Llama3 model deployed on AWS GPU Instance.

# Technical Details.

1. Plasmo for chrome extension development.

2. WebRTC for real-time audio streaming.

3. React framework
