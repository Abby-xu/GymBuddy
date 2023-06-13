import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Popup from './Popup';
import Stack from '@mui/material/Stack';
import './StackTag.css';
import { API_IP_ADDRESS } from "../../config";




function EquipManagement(){
    // const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
    fetch(`${API_IP_ADDRESS}/equipment/`)
        .then(response => response.json())
        .then(data => {
        const rowsWithId = data.data[0][1].map((item, index) => ({ ...item, id: index }));
        setRows(rowsWithId);
        })
        .catch(error => console.error(error));
    }, []);

    const handleDeleteClick = (id) => {
        fetch(`${API_IP_ADDRESS}/equipment/${id}`, {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };

    const columns = [
        { field: 'equip_id', headerName: 'ID', width: 70 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'equip_name', headerName: 'Equipment Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'location', headerName: 'Location', width: 120 },
    ];


    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleOpen = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div style={{ height: 580, width: '100%' }}>
            <h2> Equipment Management List </h2>
            {rows.length > 0 ? (
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                rowSelectionModel={rowSelectionModel}
            />
            ) : (
                <div>Loading...</div>
            )}
            <Stack direction="row" spacing={2} className="StackTag">

            <Button variant="contained" endIcon={<SendIcon />} 
                onClick={() => handleOpen()}>
                Add Equipment
            </Button>

            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => {
                const remainingRows = rows.filter((row) => !rowSelectionModel.includes(row.id));
                const deleteRows = rows.filter((row) => rowSelectionModel.includes(row.id));
                for (let i = 0; i < deleteRows.length; i++) {
                    handleDeleteClick(deleteRows[i].equip_id);
                }
                setRows(remainingRows);
                setRowSelectionModel([]);
                }}>
                Delete
            </Button>
            {showPopup ? <Popup /> : null}
            </Stack>
        </div>
    );
}

export default EquipManagement;

