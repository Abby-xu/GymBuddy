import React from 'react';
import './SurveyCollection.css';

function SurveyCollection(){
  return (
    <div className="landing-page">
      <h1 className="title">Survey Collection</h1>
      <p className="subtitle">Click the button below to view more details information about user survey</p>
      <a href="https://docs.google.com/forms/d/1P8bHdC-1qF0FhOCgJmfioYigiGoYgwIO2ZhufvuJI2Q/edit#responses" target="_blank" rel="noopener noreferrer" className="link-button">
        <button>Google Survey</button>
      </a>
    </div>
  );
};

export default SurveyCollection;