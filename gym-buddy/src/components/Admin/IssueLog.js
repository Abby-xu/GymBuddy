import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import './StackTag.css';
import { API_IP_ADDRESS } from "../../config";

function IssueLog(){
  const [rows, setRows] = useState([]);

    useEffect(() => {
    fetch(`${API_IP_ADDRESS}/issue/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const rowsWithId = data.data[0].map((item, index) => ({ ...item, id: index }));
            setRows(rowsWithId);
        })
        .catch(error => console.error(error));
    }, []);


    const columns = [
        { field: 'issue_id', headerName: 'Issue ID', width: 150 },
        { field: 'username', headerName: 'Issue By', width: 150 },
        { field: 'subject', headerName: 'Subject', width: 250 },
        { field: 'message', headerName: 'Message', width: 450 },
    ];

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    const handleDeleteClick = (issue_id) => {
        fetch(`${API_IP_ADDRESS}/issue/${issue_id}`, {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };

    return (
        <div style={{ height: 450, width: '100%' }}>
            <h2> Issues Logs </h2>
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

            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => {
                const remainingRows = rows.filter((row) => !rowSelectionModel.includes(row.id));
                const deleteRows = rows.filter((row) => rowSelectionModel.includes(row.id));
                for (let i = 0; i < deleteRows.length; i++) {
                    handleDeleteClick(deleteRows[i].issue_id);
                }
                setRows(remainingRows);
                setRowSelectionModel([]);
                }}>
                Issues Fixed
            </Button>

            </Stack>
        </div>
    );
};

export default IssueLog;