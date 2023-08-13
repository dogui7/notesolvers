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

// My components
import Header from "./Header";

export default function EditNote() {

    // State
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category_id: 0,
    });

    // id from parameters
    const {id} = useParams();

    // Using navigate to go to home after editing
    const navigate = useNavigate()

    // On render, find the note to edit and update the state
    useEffect(() => {
        setLoading(true);
        async function fetchNote() {
            try {
                const response = await fetch(`/api/notes/note/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const jsonData = await response.json();

                // Update state to show values in form
                setFormData((prevData) => ({
                    ...prevData,
                    title: jsonData.title,
                    text: jsonData.text,
                }));

                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        
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
        // Prevent real submit from happening
        event.preventDefault();

        // PUT request
        const url = `/api/notes/editNote/${id}`;
        const data = {
            title: formData.title,
            text: formData.text,
            category_id: 1,
        };

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Go to home
        navigate("/");
    };

    return (
        <>
        <Header/>
        <h2>Edit note</h2>
        {loading ? (
            <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
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