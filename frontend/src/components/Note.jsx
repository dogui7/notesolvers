import React, { useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

import {Link} from 'react-router-dom'


export default function Note(props) {

    // if archived, it un-archives it, and visce versa
    const handleArchiveButtonClick = async () => {
        const url = `/api/notes/editNote/${props.data.id}`;
        const data = {
            archived: props.data.archived ? false : true
        };

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        window.location.reload()
    };

    const handleDeleteButtonClick = async () => {
        if(window.confirm("Are you sure you want to delete this note? it will be lost forever")) {
            // Delete note
            const url = `/api/notes/deleteNote/${props.data.id}`;

            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            window.location.reload()
        }
    };

    return (
        <Grid item xs={3}>                                         
            <Card>
                <CardHeader title={props.data.title}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.text}
                    </Typography>
                    {!props.data.archived && 
                        <Link to={`/edit/${props.data.id}`}>
                            <IconButton aria-label="delete">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    }
                    {props.data.archived 
                    ?   
                        <IconButton aria-label="delete" onClick={handleArchiveButtonClick}>
                            <UnarchiveIcon />
                        </IconButton>
                    :
                        <IconButton aria-label="delete" onClick={handleArchiveButtonClick}>
                            <ArchiveIcon />
                        </IconButton>
                    }
                    {!props.data.archived && 
                        <IconButton aria-label="delete" onClick={handleDeleteButtonClick}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </CardContent>
            </Card>
        </Grid>
        
    )
}
