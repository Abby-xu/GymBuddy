import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { API_IP_ADDRESS } from "../../../config";

const ReserveChart = () => {
  const [time, setTime] = useState([]);
    const [count, setCount] = useState([]);
  
    useEffect(() => {
      fetch(`${API_IP_ADDRESS}/reservation/today_reservation/`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Network response was not ok');
        })
        .then((data) => {
          let time = [];
          let count = [];
          for (let index = 0; index < data.data[0].length; index++) {
            time.push(data.data[0][index][0]);
            count.push(data.data[0][index][1]);
          }
          setTime(time);
          setCount(count);
  
  
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

  const data = [
    {
      x: time,
      y: count,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: '#1F77B4' },
      line: { shape: 'spline', smoothing: 1.3 },
    },
  ];
  const today = new Date().toLocaleDateString();
  const countInt = count.map(val => parseInt(val));
  const num_y = Math.max(...countInt) + 4;
  const layout = {
    // title: ,
    xaxis: {
      title: "Time (Hours)",
      range: [5, 19],
      dtick: 1,
      titlefont: {
        size: 14,
      },
    },
    yaxis: {
      title: "Number of Reservations",
      titlefont: {
        size: 14,
      },
      range: [0, num_y], 
      dtick: 1,
    },
    margin: { t: 20, r: 80, b: 100, l: 100 },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Reservations by {today} </h2>
      <div style={{ flexGrow: 1, overflowY: 'auto', textAlign:'center' }}>
        <Plot data={data} layout={layout} />
      </div>
    </div>
  );
};

export default ReserveChart;