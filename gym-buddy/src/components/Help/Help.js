import React, { useState } from 'react';
import './Help.css'
import Button from '@mui/material/Button';
import { useAuth } from '../auth'
import Typography from '@mui/material/Typography';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { API_IP_ADDRESS } from "../../config";


const Help = () => {

    const auth = useAuth()

    const username = auth.user;
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const issue = {
            username, subject, message
        }

        fetch(`${API_IP_ADDRESS}/issue/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue)
        }).then(() => {
            // console.log('New issue created')
            alert("Your issue was successfully submitted!")
            e.target.reset();
        })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });
    }

    return (
        <div>
            <div class="issue">
                <p class="title">Report Your Issue</p>
                <form onSubmit={handleSubmit}>
                    <label for="subject">SUBJECT</label>
                    <input type="text" id="subject" name="subject" onChange={(e) => setSubject(e.target.value)} placeholder=""></input>
                    <label for="message">MESSAGE</label>
                    <textarea id="Message" name="Message" onChange={(e) => setMessage(e.target.value)} class="fcf-form-control" rows="10" maxlength="3000" required></textarea>
                    <center><Button variant="contained" type="submit" startIcon={<BackupOutlinedIcon />}>SUBMIT</Button></center>
                </form>
            </div>
            <br></br>
            <br></br>
            <center>
                <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                    Please take a moment to fill out our survey to help us improve our service
                </Typography>
                <Button
                    variant="outlined"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe2-f3gVooAmLxTYHNPqj86HbskPxM_fWTBeU56s2buxQNW2w/viewform?usp=sf_link"
                    target="_blank"
                    sx={{
                        '&:hover': {
                            backgroundColor: '#e8f4f8'
                        }
                    }}
                    startIcon={<OpenInNewOutlinedIcon />}
                >
                    Link to Google Survey
                </Button>
                <center>
                    <img src="https://www.elitefts.com/wp/wp-content/uploads/2018/02/thank-you-IG.jpg" alt="Thanks for your feedback" style={{ width: '200px', marginTop: '16px' }} />
                </center>
            </center>

        </div>
    );
}
export default Help