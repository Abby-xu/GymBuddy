import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import PollIcon from "@mui/icons-material/Poll";
import DataVisualization from "./DataVisualization";
import EquipManagement from "./EquipMangement";
import UsersList from "./UsersList";
import SurveyCollection from "./SurveyCollection";
import IssueLog from "./IssueLog";
import MonitorSystems from "./MonitorSystems";

const AdminPage = () => {
  const icons = [
    PollIcon,
    FitnessCenterIcon,
    SupervisedUserCircleIcon,
    MailIcon,
    ExitToAppIcon,
    MonitorHeartIcon,
  ];
  const [selectedItem, setSelectedItem] = useState("Data Visualization");
  const handleItemClick = (text) => {
    setSelectedItem(text);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          width: "16%",
          flexGrow: 1,
          bgcolor: "background.default",
          p: 1,
          marginTop: 1, // add margin top here
        }}
      >
        <List>
          {[
            "Data Visualization",
            "Equipment Management",
            "Users List",
            "Issues Log",
            "Survey Collections",
            "Monitor Systems",
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              selected={selectedItem === text}
              onClick={() => handleItemClick(text)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {React.createElement(icons[index % icons.length])}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 2,
          width: "85%",
          marginTop: 1,
        }}
      >
        {selectedItem === "Data Visualization" && <DataVisualization />}
        {selectedItem === "Equipment Management" && <EquipManagement />}
        {selectedItem === "Users List" && <UsersList />}
        {selectedItem === "Issues Log" && <IssueLog />}
        {selectedItem === "Survey Collections" && <SurveyCollection />}
        {selectedItem === "Monitor Systems" && <MonitorSystems />}
      </Box>
    </Box>
  );
};

export default AdminPage;
