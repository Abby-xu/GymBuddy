import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import HomePic from '../imgs/3.jpg';
import IntroPic from '../imgs/4.png';

function FlipCard() {
  const [flip, setFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="vertical">
      <div style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1140px',
          maxHeight: '750px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '2%',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }} onClick={() => setFlip(!flip)}>
        <img src={HomePic} alt="Image description" style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transition: 'all 0.5s ease-in-out'
          }} />
      </div>
      <div style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1140px',
          maxHeight: '750px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '2%',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }} onClick={() => setFlip(!flip)}>
        <img src={IntroPic} alt="Image description" style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            transition: 'all 0.5s ease-in-out'
          }} />
      </div>
    </ReactCardFlip>
  );
}

export default FlipCard;
