import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { API_IP_ADDRESS } from "../../../config";

const EquipChart = () => {
    const [gymType, setGymType] = useState([]);
    const [typeNumber, setTypeNumber] = useState([]);
  
    useEffect(() => {
      fetch(`${API_IP_ADDRESS}/equipment/category/`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Network response was not ok');
        })
        .then((data) => {
          let gym_type = [];
          let type_number = [];
          for (let index = 0; index < data.data[0].length; index++) {
            gym_type.push(data.data[0][index][0]);
            type_number.push(data.data[0][index][1]);
          }
          setGymType(gym_type);
          setTypeNumber(type_number);
  
  
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const plotRef = useRef();
    const data = [
      {
        values: typeNumber,
        labels: gymType,
        type: 'pie',
        hoverinfo: 'label+percent',
        textinfo: 'none',
        hole: 0.63,
        marker: {
          colors: ['#FF7F0E', '#2CA02C', '#1F77B4'],
          line: {
            color: 'white',
            width: 2
          }
        },
        domain: {
          x: [0, 0.5],
          y: [0, 1]
        }
      }
    ];
    const layout = {
      height: '150vh',
      width: '150vw',
      scene: {
        aspectratio: { x: 1, y: 1, z: 1 },
        camera: {
          eye: {
            x: 1,
            y: 1,
            z: 1
          }
        },
        xaxis: {
          showticklabels: false,
          showgrid: false,
          zeroline: false
        },
        yaxis: {
          showticklabels: false,
          showgrid: false,
          zeroline: false
        },
        zaxis: {
          showticklabels: false,
          showgrid: false,
          zeroline: false
        }
      },
    };    
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Equipment Types Chart</h2>
        <div style={{ flexGrow: 1, overflowY: 'auto', textAlign: 'center' }}>
          <Plot data={data} layout={layout} />
        </div>
      </div>
      
    );
  };
  
  export default EquipChart;
  