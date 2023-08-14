// API services
import {editNote, deleteNote} from "../api/apiNotesService";

// useState hook
import {useState} from 'react'

// React router dom
import {Link} from 'react-router-dom'

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function Note(props) {
    
    // State
    const [error, setError] = useState({error: false, status: ""});

    // Archive the note, via a PUT request
    const handleArchiveButtonClick = async () => {

        // PUT request
        const data = {
            archived: true
        };

        
        try {
            await editNote(data, props.data.id);
            // Refresh the window to see changes (Ideally, it should re-render the NotesList or ArchivedList component)
            window.location.reload();
        } catch (e) {
            setError({error: e.message, status: e.status});
        }
        
    };

    // Retrieve the note, via a PUT request
    const handleRetrieveButtonClick = async () => {

        // PUT request
        const data = {
            archived: false
        };

        try {
            await editNote(data, props.data.id);
            // Refresh the window to see changes (Ideally, it should re-render the NotesList or ArchivedList component)
            window.location.reload();
        } catch (e) {
            setError({error: e.message, status: e.status});
        };
    };



    // Handle delete button with a confirmation and make DELETE request
    const handleDeleteButtonClick = async () => {
        // Confirm delete
        if(window.confirm("Are you sure you want to delete this note? It will be lost forever")) {
            // DELETE request
            try {
                await deleteNote(props.data.id);
                // Refresh the window to see changes (Ideally, it should re-render the NotesList or ArchivedList component)
                window.location.reload();
            } catch (e) {
                setError({error: e.message, status: e.status});
            };
        }
    };

    return (
        <>
        {error.error ? (
            <h2>Error fetching data: {error.error + error.status}</h2>
        ) : (
            <Grid item xs={6} sm={4} lg={3}>                                         
                <Card>
                    {/* Title */}
                        <Link to={`/note/${props.data.id}`}>
                            <CardHeader title={props.data.title}/>
                        </Link>
                    <CardContent>
                        {/* Text */}
                        <Typography variant="body2" color="text.secondary">
                            {props.data.text}
                        </Typography>
                        {/* Edit icon */}
                        {!props.data.archived && 
                            <Link to={`/edit/${props.data.id}`}>
                                <Tooltip title="Edit" arrow enterDelay={200} leaveDelay={100}>
                                    <IconButton>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        }
                        {/* Archive || retrieve button */}
                        {props.data.archived 
                        ?   
                            <Tooltip title="Retrieve" arrow enterDelay={200} leaveDelay={100}>
                                <IconButton onClick={handleRetrieveButtonClick}>
                                    <UnarchiveIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        :
                            <Tooltip title="Archive" arrow enterDelay={200} leaveDelay={100}>
                                <IconButton onClick={handleArchiveButtonClick}>
                                    <ArchiveIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        }
                        {/* Delete button */}
                        <Tooltip title="Delete" arrow enterDelay={200} leaveDelay={100}>
                            <IconButton onClick={handleDeleteButtonClick}>
                                <DeleteIcon color="error"/>
                            </IconButton>
                        </Tooltip>
                    </CardContent>
                </Card>
            </Grid>
        )}
        </>
    )
}
