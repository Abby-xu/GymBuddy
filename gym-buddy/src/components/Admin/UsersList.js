import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import './StackTag.css';
import { API_IP_ADDRESS } from "../../config";


function UsersList(){
    const [rows, setRows] = useState([]);

    useEffect(() => {
    fetch(`${API_IP_ADDRESS}/user/`)
        .then(response => response.json())
        .then(data => {
        const rowsWithId = data.data[0].map((item, index) => ({ ...item, id: index }));
        setRows(rowsWithId);
        })
        .catch(error => console.error(error));
    }, []);


    const columns = [
        { field: 'username', headerName: 'Username', width: 350 },
        { field: 'identity', headerName: 'Identity', width: 350 },
    ];

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    const handleDeleteClick = (username) => {
        fetch(`${API_IP_ADDRESS}/user/${username}`, {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };

    return (
        <div style={{ height: 450, width: '100%' }}>
            <h2> Users List </h2>
            {rows.length > 0 ? (
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 7,
                      },
                    },
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                rowSelectionModel={rowSelectionModel}
            />
            ) : (
                <div>Loading...</div>
            )}
            <Stack direction="row" spacing={2} className="StackTag">

            <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={() => {
                const remainingRows = rows.filter((row) => !rowSelectionModel.includes(row.id));
                const deleteRows = rows.filter((row) => rowSelectionModel.includes(row.id));
                for (let i = 0; i < deleteRows.length; i++) {
                    handleDeleteClick(deleteRows[i].username);
                }
                setRows(remainingRows);
                setRowSelectionModel([]);
                }}>
                Delete
            </Button>

            </Stack>
        </div>
    );
}

export default UsersList;

