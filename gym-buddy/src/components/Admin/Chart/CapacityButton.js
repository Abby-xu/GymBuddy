import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { API_IP_ADDRESS } from "../../config";

const CapacityButton = () => {
    const [numPeople, setNumPeople] = useState(null);
    const [error, setError] = useState(null);
  
    const getCurrentCapacity = async () => {
      try {
        const response = await fetch(`${API_IP_ADDRESS}/monitor/getCurrentCapacity/`);
        const numPeople = await response.json();
        setNumPeople(numPeople['response']);
        setError(null);
      } catch (error) {
        setError(error.message);
        setNumPeople(null);
      }
    };
  
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
          <Button variant="contained" onClick={getCurrentCapacity}>Capacity</Button>
          {numPeople && (
              <h5 style={{paddingLeft: '20px', fontSize:'8px'}}>Current capacity is {numPeople} person</h5>
          )}
          {error && <div>Error: {error}</div>}
        </div>
    );
  };
  
export default CapacityButton;