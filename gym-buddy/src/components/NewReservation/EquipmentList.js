import React from 'react'
import { Grid } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary, Radio, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const CARDIO_EQUIPMENT = [
  { id: 1, name: 'Stair Master' },
  { id: 2, name: 'Treadmill' },
  { id: 3, name: 'Rower' },
  { id: 4, name: 'Elliptical' },
  { id: 5, name: 'Indoor Cycle' },
  { id: 6, name: 'Upper Arm Rehab Bike' },
];

const RESISTANCE_EQUIPMENT = [
  { id: 7, name: 'Assisted Pull-up Machine' },
  { id: 8, name: 'Leg Press Machine' },
  { id: 9, name: 'Leg Extension Machine' },
  { id: 10, name: 'Chest Press Machine' },
  { id: 11, name: 'Lat Pull Down Machine' },
  { id: 12, name: 'Dip Tower' },
];

const FREE_WEIGHT_EQUIPMENT = [
  { id: 13, name: 'Barbell Set' },
  { id: 14, name: 'Smith Machine' },
  { id: 15, name: 'Adjustable Bench' },
  { id: 16, name: 'Functional Trainer' },
];

const EquipmentList = ({ selectedEquipment, handleEquipmentChange }) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Find Your Equipment
        </Typography>
      </Grid>
      <Grid item xs={12}>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="cardio-content" id="cardio-header">
            <Typography variant="h6">Cardio 🏃</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {CARDIO_EQUIPMENT.map((equipment) => {
                const labelId = `radio-list-label-${equipment.id}`;

                return (
                  <ListItem
                    key={equipment.id}
                    dense
                    button
                    onClick={() => document.getElementById(`equipment-radio-${equipment.id}`).click()}
                  >
                    <Radio
                      id={`equipment-radio-${equipment.id}`}
                      checked={selectedEquipment === equipment.name}
                      onChange={handleEquipmentChange}
                      value={equipment.name}
                      name="equipment-radio-button"
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText id={labelId} primary={equipment.name} />
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="resistance-content" id="resistance-header">
            <Typography variant="h6">Resistance 🔥</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {RESISTANCE_EQUIPMENT.map((equipment) => {
                const labelId = `radio-list-label-${equipment.id}`;

                return (
                  <ListItem
                    key={equipment.id}
                    dense
                    button
                    onClick={() => document.getElementById(`equipment-radio-${equipment.id}`).click()}
                  >
                    <Radio
                      id={`equipment-radio-${equipment.id}`}
                      checked={selectedEquipment === equipment.name}
                      onChange={handleEquipmentChange}
                      value={equipment.name}
                      name="equipment-radio-button"
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText id={labelId} primary={equipment.name} />
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="free-weight-content" id="free-weight-header">
            <Typography variant="h6">Free Weight 🏋️</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {FREE_WEIGHT_EQUIPMENT.map((equipment) => {
                const labelId = `radio-list-label-${equipment.id}`;

                return (
                  <ListItem
                    key={equipment.id}
                    dense
                    button
                    onClick={() => document.getElementById(`equipment-radio-${equipment.id}`).click()}
                  >
                    <Radio
                      id={`equipment-radio-${equipment.id}`}
                      checked={selectedEquipment === equipment.name}
                      onChange={handleEquipmentChange}
                      value={equipment.name}
                      name="equipment-radio-button"
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText id={labelId} primary={equipment.name} />
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>

      </Grid>
    </Grid>


  );
}

export default EquipmentList