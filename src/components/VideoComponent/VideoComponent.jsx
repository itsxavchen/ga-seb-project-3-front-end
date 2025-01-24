import React from 'react';
import "./VideoComponent.css";
const VideoComponent = () => {
  return (
    <div className='video-wrapper'>
      <video  autoPlay  muted loop>
        <source src="/videos/landing_video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoComponent;