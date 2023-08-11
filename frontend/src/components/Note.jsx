import React, { useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import {Link} from 'react-router-dom'

import ConfirmationDialog from './ConfirmationDialog';

export default function Note(props) {

    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const handleDeleteButtonClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        // Delete note
        const url = `/api/notes/deleteNote/${props.data.id}`;

        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        setShowConfirmation(false); // Hide the confirmation dialog
      };

    const handleCancel = () => {
        setShowConfirmation(false); // Hide the confirmation dialog
    };

    return (
        <Grid item xs={3}>                                         
            <Card>
                <CardHeader title={props.data.title}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.text}
                    </Typography>
                    <Link to={`/edit/${props.data.id}`}>Edit</Link>
                    {props.data.archived 
                    ? 
                    <p onClick={handleArchiveButtonClick}>Retrieve</p>
                    :
                    <p onClick={handleArchiveButtonClick}>Archive</p>
                    }
                    <p onClick={handleDeleteButtonClick}>Delete</p>
                    {showConfirmation && (
                        <ConfirmationDialog
                            message="Are you sure you want to delete this note? it will be lost forever"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
                </CardContent>
            </Card>
        </Grid>
        
    )
}
