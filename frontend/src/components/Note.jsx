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

export default function Note(props) {

    // If archived, it retrieves it, and vice versa via a PUT request
    const handleArchiveButtonClick = async () => {

        // PUT request
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

        // Refresh the window to see changes (Ideally, it should re-render the NotesList or ArchivedList component)
        window.location.reload()
    };

    // Handle delete button with a confirmation and make DELETE request
    const handleDeleteButtonClick = async () => {
        // Confirm delete
        if(window.confirm("Are you sure you want to delete this note? It will be lost forever")) {
            // DELETE request
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
                {/* Title */}
                <CardHeader title={props.data.title}/>
                <CardContent>
                    {/* Text */}
                    <Typography variant="body2" color="text.secondary">
                        {props.data.text}
                    </Typography>
                    {/* Edit icon */}
                    {!props.data.archived && 
                        <Link to={`/edit/${props.data.id}`}>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
                        </Link>
                    }
                    {/* Archive || retrieve button */}
                    {props.data.archived 
                    ?   
                        <IconButton onClick={handleArchiveButtonClick}>
                            <UnarchiveIcon/>
                        </IconButton>
                    :
                        <IconButton onClick={handleArchiveButtonClick}>
                            <ArchiveIcon/>
                        </IconButton>
                    }
                    {/* Delete button */}
                    {!props.data.archived && 
                        <IconButton onClick={handleDeleteButtonClick}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}
