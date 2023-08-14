// API services
import {getNote, editNote} from "../api/apiNotesService";

// useEffect and useState hook
import {useEffect, useState} from 'react'

// React router dom
import {useNavigate, useParams} from "react-router-dom";

// Loader
import HashLoader from "react-spinners/HashLoader";

// MUI
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function EditNote() {

    // State
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category_id: 0,
    });
    const [error, setError] = useState({error: false, status: ""});

    // id from parameters
    const {id} = useParams();

    // Using navigate to go to home after editing
    const navigate = useNavigate()

    // On render, find the note to edit and update the state
    useEffect(() => {
        async function fetchNote() {
            try {
                const noteData = await getNote(id);
                
                // Update state to show values in form
                setFormData((prevData) => ({
                    ...prevData,
                    title: noteData.title,
                    text: noteData.text,
                }));
                
                setLoading(false);
            } catch (e) {
                setError({error: e.message, status: e.status});
                setLoading(false);
            }
        }
        
        setLoading(true);
        fetchNote();
    }, [])

    // On any input change, update the state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submit and make PUT request
    const handleFormSubmit = async (event) => {
        // PUT request
        const data = {
            title: formData.title,
            text: formData.text,
            category_id: 1,
        };

        try {
            await editNote(data, id);
            // Go to home
            navigate("/");
        } catch (e) {
            setError({error: e.message, status: e.status});
        }
    };

    return (
        <>
        <h2>Edit note</h2>
        {loading ? (
            <Grid container justifyContent="center">
                <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
            </Grid>
        ) : error.error ? (
            <h2>Error fetching data: {error.error + "  " + error.status}</h2>
        ) : (
            <Grid container spacing={2}>
                <Grid item xs={3}>                                         
                    <Card>
                        <CardContent>
                            {/* Title */}
                            <TextField margin="normal" fullWidth multiline size="small" label="Title" variant="outlined"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            {/* Text */}
                            <TextField margin="normal" fullWidth multiline size="small" label="Text" variant="outlined" 
                                type="text"
                                name="text"
                                value={formData.text}
                                onChange={handleInputChange}
                            />
                            <Button variant="contained" onClick={handleFormSubmit}>Edit</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )}
        </>
    );
}