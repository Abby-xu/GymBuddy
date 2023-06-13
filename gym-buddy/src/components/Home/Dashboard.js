import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Dashboard.css";
import FlipCard from "./flipCard";
import { API_IP_ADDRESS } from "../../config";


function Dashboard() {
  const [availability, setAvailability] = useState(0);
  const [percentAvailable, setPercentAvailable] = useState(0);

  useEffect(() => {
    fetch(`${API_IP_ADDRESS}/equipment/`)
      .then((response) => response.json())
      .then((json) => {
        setAvailability(json.data[0][0]);
        setPercentAvailable(((json.data[0][0] / 95) * 100).toFixed(1));
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
  return (
    <center>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '55%' }}>
          <div class="dashboard">
            <div class="dashboardInnerBorder">
              <center>
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <div class="capacityDiv" style={{ width: "40%", justifyContent: "center" }}>
                    <p style={{ textAlign: "center" }}><b>AVAILABLE EQUIPMENT</b></p>
                    <div class="capacity" style={{ margin: "auto" }}>
                      <p>{availability}</p>
                    </div>
                  </div>
                  <div class="capacityDiv" style={{ width: "40%", justifyContent: "center" }}>
                    <p style={{ textAlign: "center" }}><b>TOTAL EQUIPMENT</b></p>
                    <div class="capacity" style={{ margin: "auto" }}>
                      <p>95</p>
                    </div>
                  </div>
                </div>
                <br></br>
                <div class="capacityDiv" style={{ width: "30%", paddingLeft: "30%", paddingRight: "30%" }}>
                  <p><b>Availability<br></br>%</b></p>
                  <CircularProgressbar
                    value={percentAvailable}
                    text={`${percentAvailable}%`}
                    styles={buildStyles({
                      textColor: "#2196f3",
                      pathColor: "#2196f3",
                      trailColor: "F0F0F0",
                    })}
                    testid="progress-bar" // Add this line
                  ></CircularProgressbar>
                </div>
                <br></br>
              </center>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", width: "45%", justifyContent: "center", marginRight: "15%"}}>
          {/* <img src={HomePic} alt="Image description" style={{ width: '102%', height: 'auto', maxWidth: '1140px', maxHeight: '750px', marginRight: '45%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', marginTop: "0.5%", borderRadius: "2%"}} /> */}
          <FlipCard />
        </div>
      </div>
    </center>
  );
}
export default Dashboard;
