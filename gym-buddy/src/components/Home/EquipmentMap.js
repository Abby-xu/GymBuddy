import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Elliptical from "./pics/Elliptical.png";
import Recumbent from "./pics/Recumbent.png";
import Rower from "./pics/Rower.png";
import Bike from "./pics/Bike.png";
import Treadmill from "./pics/Treadmill.webp";
import StairMaster from "./pics/StairMaster.png";
import SmithMachine from "./pics/SmithMachine.png";
import AdjustableBench from "./pics/AdjustableBench.png";
import Resistance from "./pics/Resistance.png";
import BarbellSet from "./pics/BarbellSet.png";
import FunctionalTrainer from "./pics/FunctionalTrainer.png";
import LoopIcon from '@mui/icons-material/Loop';
import { API_IP_ADDRESS } from "../../config";

function EquipmentMap() {
  const [Equipments, setEquipments] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    fetch(`${API_IP_ADDRESS}/equipment`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setEquipments(data.data[0][1]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = Array.from({ length: 35 }, (_, i) => i + 1);
  const StyledTableCell = styled(TableCell)({ padding: 0.2, borderRadius: 0 });

  return (
    <>
      {Equipments.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ marginRight: "10px" }}>Loading...</h3>
          <LoopIcon />
        </div>

      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 640, tableLayout: "fixed" }}
            aria-label="equipment map"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ border: "none" }} />
                {cols.map((col) => (
                  <TableCell
                    key={`col-${col}`}
                    align="center"
                    style={{ border: "none", fontSize: "102%", fontWeight: "bold" }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={`row-${row}`}>
                  <TableCell component="th" scope="row"
                    style={{ border: "none", fontSize: "102%", fontWeight: "bold" }}
                  >
                    {row}
                  </TableCell>
                  {cols.map((col) => {
                    const equipment = Equipments.find(
                      (e) => e.location === `${row}${col}`
                    );
                    return (
                      <StyledTableCell
                        key={`cell-${row}-${col}`}
                        align="center"
                        style={{
                          padding: 5,
                          border: "1px solid #ffffff",
                          backgroundColor: equipment
                            ? equipment.status === "maintenance"
                              ? "#f8d568"
                              : equipment.status === "in-use"
                                ? "#ff4500"
                                : "#6ec072"
                            : "white",
                        }}
                      >
                        {equipment ? (
                          equipment.equip_name === "Indoor Cycle" ? (
                            <img
                              src={Recumbent}
                              alt="Indoor Cycle"
                              width="90%"
                              height="90%"
                              title="Indoor Cycle"
                            />
                          ) : equipment.equip_name === "Recumbent" ? (
                            <img
                              src={Recumbent}
                              alt="Recumbent"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Rower" ? (
                            <img
                              src={Rower}
                              alt="Rower"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Barbell Set" ? (
                            <img
                              src={BarbellSet}
                              alt="Barbell Set"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Treadmill" ? (
                            <img
                              src={Treadmill}
                              alt="Treadmill"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Upper Arm Rehab Bike" ? (
                            <img
                              src={Bike}
                              alt="Upper Arm Rehab Bike"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Elliptical" ? (
                            <img
                              src={Elliptical}
                              alt="Elliptical"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Stair Master" ? (
                            <img
                              src={StairMaster}
                              alt="StairMaster"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Smith Machine" ? (
                            <img
                              src={SmithMachine}
                              alt="SmithMachine"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Adjustable Bench" ? (
                            <img
                              src={AdjustableBench}
                              alt="AdjustableBench"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.equip_name === "Functional Trainer" ? (
                            <img
                              src={FunctionalTrainer}
                              alt="FunctionalTrainer"
                              width="90%"
                              height="90%"
                            />
                          ) : equipment.category === "Resistance" ? (
                            <img
                              src={Resistance}
                              alt="Resistance"
                              width="90%"
                              height="90%"
                            />
                          ) : (
                            "#4CAF50"
                          )
                        ) : (
                          " "
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default EquipmentMap;
