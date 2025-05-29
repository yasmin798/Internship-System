import React, { useState } from 'react';

const VideoPlayer = ({ workshopId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayRecording = () => {
    setIsPlaying(true);
  };

  return (
    <div className="p-4">
      <h3 className="h5 mb-3">Video Player for Workshop {workshopId}</h3>
      {!isPlaying ? (
        <button className="btn btn-success" onClick={handlePlayRecording}>
          Play Recording
        </button>
      ) : (
        <div>
          <div className="mb-3">
            <video
              controls
              style={{ width: '100%', maxHeight: '400px' }}
              poster="https://via.placeholder.com/640x360?text=Video+Thumbnail"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;