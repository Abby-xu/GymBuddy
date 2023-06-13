import React, { useState, useEffect, useRef} from 'react';
import Plot from 'react-plotly.js';
import { API_IP_ADDRESS } from "../../../config";

const AvailableChart = () => {
  const [statusType, setStatusType] = useState([]);
  const [statusNumber, setStatusNumber] = useState([]);
  useEffect(() => {
    fetch(`${API_IP_ADDRESS}/equipment/status/`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        let statusType = [];
        let statusNumber = [];
        for (let index = 0; index < data.data[0].length; index++) {
          statusType.push(data.data[0][index][0]);
          statusNumber.push(data.data[0][index][1]);
        }
        setStatusType(statusType);
        setStatusNumber(statusNumber);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const data = [    
    {      
      x: statusType,
      y: statusNumber,
      type: 'bar',
      marker: {
        color: ['#90EE90', '#ffcccb', '#FFFF33'],
        line: {
          color: 'rgba(255, 99, 132, 1)',
          width: 1
        }
      }
    }
  ];
  
  const [layout, setLayout] = useState({
    xaxis: {
      title: 'Status'
    },
    yaxis: {
      title: 'Num of Equipment'
    }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Equipment Status Chart</h2>
      <div style={{ flexGrow: 1, overflowY: 'auto', textAlign: 'center' }}>
        <Plot data={data} layout={layout} />
      </div>
    </div>
  );
};
  
export default AvailableChart;