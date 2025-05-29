import React, { useState, useEffect, useRef } from 'react';

const LiveCallUI = ({ workshopId }) => {
  const [name, setName] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [mediaStream, setMediaStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recordingUrl, setRecordingUrl] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    if (isSetupComplete || isJoined) {
      const getMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setMediaStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          alert('Error accessing camera/mic: ' + err.message);
        }
      };
      getMedia();
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isSetupComplete, isJoined]);

  const handleStartScreenShare = async () => {
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(screen);
      if (videoRef.current) {
        videoRef.current.srcObject = screen;
      }
    } catch (err) {
      console.error('Error sharing screen:', err);
      alert('Screen sharing failed.');
    }
  };

  const handleStartRecording = () => {
    if (!mediaStream) return;
    const recorder = new MediaRecorder(mediaStream);
    const chunks = [];

    recorder.ondataavailable = e => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordingUrl(url);
    };

    recorder.start();
    setRecorder(recorder);
  };

  const handleStopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecorder(null);
    }
  };

  const toggleMic = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsMicOn(track.enabled);
      });
    }
  };

  const toggleCamera = () => {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsCameraOn(track.enabled);
      });
    }
  };

  const handleJoin = () => {
    setIsJoined(true);
  };

  const handleLeaveLive = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsJoined(false);
    setIsSetupComplete(false);
    setName('');
  };

  return (
    <div className="p-4">
      <h3 className="h5 mb-3">Live Call Interface for Workshop {workshopId}</h3>

      {!isSetupComplete && !isJoined && (
        <div>
          <h5>Pre-Join Setup</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="btn btn-primary mb-3" disabled={!name} onClick={() => setIsSetupComplete(true)}>
            Proceed to Preview
          </button>
        </div>
      )}

      {(isSetupComplete || isJoined) && (
        <div>
          <div className="mb-3">
            <div style={{ height: '300px', position: 'relative', backgroundColor: '#333' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {!isCameraOn && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  Camera Off
                </div>
              )}
            </div>
          </div>

          <div className="d-flex gap-3 flex-wrap mb-3">
            <button className={`btn ${isMicOn ? 'btn-success' : 'btn-danger'}`} onClick={toggleMic}>
              {isMicOn ? 'Mic On' : 'Mic Off'}
            </button>
            <button className={`btn ${isCameraOn ? 'btn-success' : 'btn-danger'}`} onClick={toggleCamera}>
              {isCameraOn ? 'Camera On' : 'Camera Off'}
            </button>

            {!isJoined && (
              <button className="btn btn-primary" onClick={handleJoin}>
                Join Live
              </button>
            )}
            {isJoined && (
              <>
                <button className="btn btn-warning" onClick={handleStartScreenShare}>
                  Share Screen
                </button>
                {!recorder ? (
                  <button className="btn btn-danger" onClick={handleStartRecording}>
                    Start Recording
                  </button>
                ) : (
                  <button className="btn btn-secondary" onClick={handleStopRecording}>
                    Stop Recording
                  </button>
                )}
                <button className="btn btn-outline-dark" onClick={handleLeaveLive}>
                  Leave Live
                </button>
              </>
            )}
          </div>

          {recordingUrl && (
            <div>
              <a href={recordingUrl} download="recording.webm" className="btn btn-success">
                Download Recording
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveCallUI;