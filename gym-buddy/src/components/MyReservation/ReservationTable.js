import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../auth";
import { API_IP_ADDRESS } from "../../config";

const ReservationTable = () => {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);

  // Fetch data from database during first component mount
  useEffect(() => {
    // Fetch the data from the API

    fetch(`${API_IP_ADDRESS}/user/${auth.user}/reservations`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setData(data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth.user]);

  // Real Version: this one talks to a database and changes front end state data
  const handleDelete = (id) => {
    fetch(`${API_IP_ADDRESS}/reservation/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the delete request was successful, remove the row from the table
          const updatedData = data.filter((row) => row.res_id !== id);
          setData(updatedData);
          alert('Delete Successfully')
        } else {
          throw new Error("Error deleting row");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch data from database during first component mount
  useEffect(() => {
    // Fetch the data from the API
    fetch(`${API_IP_ADDRESS}/equipment`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setEquipmentData(data.data[0][1]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const idLocMap = {};
  equipmentData.map((equip) => {
    idLocMap[equip.equip_id] = equip.location;
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell variant="h6">Date</TableCell>
            <TableCell variant="h6">Equipment ID</TableCell>
            <TableCell variant="h6">Equipment Location</TableCell>
            <TableCell variant="h6">Start Time</TableCell>
            <TableCell variant="h6">End Time</TableCell>
            <TableCell variant="h6">Equipment Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.res_id}
              sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
            >
              <TableCell padding="16px">{row.res_date}</TableCell>
              <TableCell padding="16px">{row.equip_id}</TableCell>
              <TableCell padding="16px">{idLocMap[row.equip_id]}</TableCell>
              <TableCell padding="16px">{row.start_time}</TableCell>
              <TableCell padding="16px">{row.end_time}</TableCell>
              <TableCell padding="16px">{row.equip_name}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(row.res_id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationTable;
