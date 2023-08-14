// API services
import {createNote} from "../api/apiNotesService";

// useState hook
import {useState} from 'react';

// React router dom
import {useNavigate} from "react-router-dom";

// MUI
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function CreateNote() {

    // State
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category_id: 0,
    });
    const [error, setError] = useState({error: false, status: ""});
    
    // Using navigate to go to home after editing
    const navigate = useNavigate()

    // On any input change, update the state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submit and make POST request
    const handleFormSubmit = async (event) => {
        // POST request
        const data = {
            title: formData.title,
            text: formData.text,
            archived: false,
            category_id: 1,
        };
        try {
            await createNote(data);
            // Go to home
            navigate("/");
        } catch (e) {
            setError({error: e.message, status: e.status});
        }
    };

    return (
        <>
        <h2>Create new note</h2>
        {error.error ? (
            <h2>Error fetching data: {error.error + error.status}</h2>
        ) : (
            <Grid container spacing={2}>
                <Grid item xs={3}>                                         
                    <Card>
                        <CardContent>
                            {/* Title */}
                            <TextField margin="normal" fullWidth multiline size="small" label="Title" variant="outlined"
                                type="text"
                                name="title"
                                onChange={handleInputChange}
                            />
                            {/* Text */}
                            <TextField margin="normal" fullWidth multiline size="small" label="Text" variant="outlined" 
                                type="text"
                                name="text"
                                onChange={handleInputChange}
                            />
                            <Button variant="contained" onClick={handleFormSubmit}>Create</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )}
        </>
    );
}