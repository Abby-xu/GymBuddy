import React, { useState } from "react";
import Button from "@mui/material/Button";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { API_IP_ADDRESS } from "../../config";

const MonitorSystems = () => {
  const [IP, setIP] = useState("");
  const [port, setPort] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_IP_ADDRESS}/equipment/setMonitor/${IP}/${port}`, {})
      .then(() => {
        alert("Your data was successfully submitted!");
        e.target.reset();
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };

  return (
    <div class="issue">
      <p class="title">Configure Monitor Systems</p>
      <form onSubmit={handleSubmit}>
        <label for="ip">IP Address</label>
        <input
          type="text"
          id="ip"
          name="ip"
          onChange={(e) => setIP(e.target.value)}
          placeholder=""
        ></input>
        <label for="port">Port</label>
        <input
          type="text"
          id="port"
          name="port"
          onChange={(e) => setPort(e.target.value)}
          placeholder=""
        ></input>
        <center>
          <Button
            variant="contained"
            type="submit"
            startIcon={<BackupOutlinedIcon />}
          >
            SUBMIT
          </Button>
        </center>
      </form>
    </div>
  );
};

export default MonitorSystems;
