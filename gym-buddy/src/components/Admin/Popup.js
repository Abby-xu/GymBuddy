import React, { useState } from 'react';
import './Popup.css';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import { API_IP_ADDRESS } from "../../config";

function Popup(props) {
  const [showPopup, setShowPopup] = useState(true);

  const handleButtonClick = () => {
    setShowPopup(false);
  };

  const [formData, setFormData] = useState({
    equip_id: '',
    equip_name: '',
    category: '',
    status: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`ID: ${formData.equip_id}\nName: ${formData.equip_name}\nCategory: ${formData.category}\nStatus: ${formData.status}\nLocation:${formData.location}`);
    console.log(JSON.stringify(formData));
    fetch(`${API_IP_ADDRESS}/equipment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  
  return (
    <div className={showPopup ? "popup" : "popup hidden"}>
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
            <label>
            Equipment ID:
            <input type="text" value={formData.equip_id} onChange={(e) => setFormData({...formData, equip_id: e.target.value})} />
            </label>
            <label>
            Equipment Name:
            <input type="text" value={formData.equip_name} onChange={(e) => setFormData({...formData, equip_name: e.target.value})} />
            </label>
            <label>
            Category:
            <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
            </label>
            <label>
            Status:
            <input type="text" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} />
            </label>
            <label>
            Location:
            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </label>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" endIcon={<SendIcon />}  
                    type="submit" onClick={handleButtonClick}>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" startIcon={<CancelIcon />}
                    onClick={handleButtonClick}>
                    Cancel
                </Button>
            </Stack>
        </form>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;