import { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import React from "react";
import ScheduleView from "./ScheduleView";
import EquipmentList from "./EquipmentList";
import MyDatePicker from "./MyDatePicker";
import EquipPicker from "./EquipPicker";
import { useAuth } from "../auth";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useNavigate } from "react-router-dom";
import { API_IP_ADDRESS } from "../../config";

const NewReservation = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [resId, setResId] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeBlock, setSelectedTimeBlock] = useState("");
  const [blockedTime, setBlockedTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fieldsSelected, setFieldsSelected] = useState(false);
  const [timeBlockSelected, setTimeBlockSelected] = useState(false);
  const [availEquip, setAvailEquip] = useState("");
  const [equipId, setEquipId] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [remainReserve, setRemainReserve] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    availEquip.map((equipment) => {
      if (equipment.location === event.target.value) {
        setEquipId(equipment.equip_id);
      }
    });
  };

  const formatDate = (date) => {
    const dateComponents = date.split('-');
    const formattedDateString = `${dateComponents[1].padStart(2, '0')}${dateComponents[2].padStart(2, '0')}${dateComponents[0]}`;
    return formattedDateString;
  };


  const calculateRemainingReservations = async (date) => {
    try {
      if (auth.user) {
        const dateComponents = date.split('-');
        const formattedDateString = `${dateComponents[0].padStart(2, '0')}${dateComponents[1].padStart(2, '0')}${dateComponents[2]}`;
        const response = await fetch(
          `${API_IP_ADDRESS}/reservation/limit/${formattedDateString}/${auth.user}`
        );
        const data = await response.json();
        setRemainReserve(data.data[0]);
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  //get the available equipments
  useEffect(() => {
    if (selectedEquipment && selectedDate && selectedTimeBlock) {
      const [startT, endT] = selectedTimeBlock.split("-");

      fetch(
        `${API_IP_ADDRESS}/equipment/available_equip/${selectedDate}/${selectedEquipment}/${startT}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAvailEquip(data.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedEquipment, selectedDate, selectedTimeBlock]);

  useEffect(() => {
    if (selectedEquipment && selectedDate) {
      fetch(
        `${API_IP_ADDRESS}/reservation/block/${selectedEquipment}/${selectedDate}/${auth.user}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Blocked time retrieved successfully") {
            setBlockedTime(data.data[0]);
          } else {
            setBlockedTime([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedEquipment, selectedDate, auth.user]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        let formattedDate = "";
        if (auth.user) {
          const storedDate = JSON.parse(localStorage.getItem("selectedDate"));
          if (storedDate) {
            setSelectedDate(storedDate);
            formattedDate = formatDate(storedDate);
          } else {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${year}-${month}-${day}`;
            formattedDate = formatDate(currentDate);
          }

          const response = await fetch(
            `${API_IP_ADDRESS}/reservation/limit/${formattedDate}/${auth.user}`
          );
          const data = await response.json();
          setRemainReserve(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (remainReserve == null) { // only call if remainReserve state is not set
      fetchReservations();
    }
  }, [auth.user, remainReserve, selectedDate]);

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
    setFieldsSelected(!!selectedDate); // Check if date is already selected
  };

  const handleDateChange = (event) => {
    const dateStr = event.target.value.toString();
    setSelectedDate(dateStr);

    const dateArr = dateStr.replace(/-/g, "");
    let month = dateArr.substring(4, 6);
    let day = dateArr.substring(6, 8);
    let year = dateArr.substring(0,4);
    const newDateStr = `${month}-${day}-${year}`;
    calculateRemainingReservations(newDateStr);
    localStorage.setItem('selectedDate', JSON.stringify(dateStr));
    setFieldsSelected(!!selectedEquipment); // Check if equipment is already selected
  };

  const isDisabled = (startTime, endTime) => {
    const block = `${startTime}-${endTime}`;
    return blockedTime.includes(block);
  };

  const handleConfirm = async () => {
    try {
      await handleBook();
      alert("Book successfully!");
      setTimeout(() => {
        navigate("/myreservation");
      }, 1000); // delay the navigation by 1 second
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };
  

  const handleCancel = () => {
    // Close the confirmation window
    setShowModal(false);
  };

  const handleOpenModal = () => {
    if (!selectedEquipment || !selectedDate || !selectedTimeBlock || !equipId) {
      alert("Please select equipment, date, timeblock, and equipId");
      return;
    } else {
      setResId(generateRandomId(8));
      setShowModal(true);
    }
  };

  const handleTimeBlockChange = (startTime, endTime) => {
    if (isDisabled(startTime, endTime)) {
      return;
    }
    setSelectedTimeBlock(`${startTime}-${endTime}`);
    setTimeBlockSelected(true);
  };

  const handleBook = () => {
    //parse selected date

    let dateStr = selectedDate.replace(/-/g, '');
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const year = dateStr.substring(0, 4);
  
    dateStr = `${month}/${day}/${year}`;
    const [startTime, endTime] = selectedTimeBlock.split("-");

    fetch(`${API_IP_ADDRESS}/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        res_id: resId,
        equip_id: equipId,
        equip_name: selectedEquipment,
        username: auth.user,
        res_date: dateStr,
        start_time: startTime,
        end_time: endTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };

  const generateRandomId = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  let startTime = "";
  let endTime = "";
  if(selectedDate){
    [startTime, endTime] = selectedTimeBlock.split("-");
  }

  return remainReserve !== 0 ? (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box mt={2}>
          <EquipmentList
            selectedEquipment={selectedEquipment}
            handleEquipmentChange={handleEquipmentChange}
            data-testid="equipment-selector"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box mt={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="blue">
              Remain Reservation: {remainReserve}
            </Typography>
          </Grid>
        </Box>
        <Box mt={2}>
          <MyDatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            setSelectedDate={setSelectedDate}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {fieldsSelected && (
          <ScheduleView
            blockedTime={blockedTime}
            selectedTimeBlock={selectedTimeBlock}
            handleTimeBlockChange={handleTimeBlockChange}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {timeBlockSelected && (
          <EquipPicker
            availEquip={availEquip}
            location={location}
            handleLocationChange={handleLocationChange}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Box mt={5}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<BookmarkAddedIcon />}
            fullWidth
            style={{ borderRadius: 25, fontWeight: "bold" }}
            size="large"
          >
            Book
          </Button>
        </Box>
        <Dialog
          open={showModal}
          onClose={handleCancel}
          maxWidth="md" // Set the maximum width for the dialog
          fullWidth // Make the dialog use the full available width up to the maxWidth
          sx={{ "& .MuiDialog-paper": { width: "30%", minWidth: 300 } }} // Set custom width (80% of viewport) and a minimum width (600px)
        >
          <DialogTitle style={{ textAlign: "center", fontSize: "2rem" }}>
            Confirm Reservation
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              <Typography variant="body1" component="span" fontWeight="bold">
                Reservation ID:{" "}
              </Typography>
              {resId}
            </Typography>
            <Typography gutterBottom>
              <Typography variant="body1" component="span" fontWeight="bold">
                Equipment Name:{" "}
              </Typography>
              {selectedEquipment}
            </Typography>
            <Typography gutterBottom>
              <Typography variant="body1" component="span" fontWeight="bold">
                Username:{" "}
              </Typography>
              {auth.user}
            </Typography>
            <Typography gutterBottom>
              <Typography variant="body1" component="span" fontWeight="bold">
                Reservation Date:{" "}
              </Typography>
                {selectedDate}
            </Typography>
            <Typography gutterBottom>
              <Typography variant="body1" component="span" fontWeight="bold">
                Time:{" "}
              </Typography>
              {startTime} ~ {endTime}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCancel} color="error">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  ) : (
    <div style={{ textAlign: "center", marginTop: "50px" }} className="landing-page">
      <h1 className="title">
        The maximum number of reservations ({selectedDate}) has been reached.
      </h1>
      <p className="subtitle">
        Cancel your reservation / Change the date to reserve
      </p>
      <Grid item xs={12} sm={6}>
        <Box mt={2}>
          <MyDatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            setSelectedDate={setSelectedDate}
          />
        </Box>
        <Box mt={2}>
          <button onClick={() => navigate("/myreservation")}>
            Go To My Reservation
          </button>
        </Box>
      </Grid>
    </div>
  );
};

export default NewReservation;
