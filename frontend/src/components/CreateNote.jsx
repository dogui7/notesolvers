// useState hook
import {useState} from 'react';

// React router dom
import {useNavigate} from "react-router-dom";

// MUI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// My components
import Header from "./Header";

// CSS
import "../assets/CreateNote.css";

export default function CreateNote() {

    // State
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category_id: 0,
    });
    
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
        // Prevent real submit from happening
        event.preventDefault();

        // POST request
        const url = "/api/notes/addNote";
        const data = {
            title: formData.title,
            text: formData.text,
            archived: false,
            category_id: 1,
        };

        await fetch(url, {
            method: "POST",
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
        <h2>Create new note</h2>
        <form onSubmit={handleFormSubmit}>

        <Grid container spacing={2}>
            <Grid item xs={3}>                                         
                <Card>
                    {/* Title */}
                    <CardContent>
                        {/* Text */}
                        <Typography variant="body2" color="text.secondary" id="title-create-note">
                            <TextField fullWidth multiline size="small" id="outlined-basic" label="Title" variant="outlined"
                                type="text"
                                name="title"
                                onChange={handleInputChange}
                            />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <TextField fullWidth multiline size="small" id="outlined-basic" label="Text" variant="outlined" 
                                type="text"
                                name="text"
                                onChange={handleInputChange}
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
            <button type="submit">Create</button>
        </form>
        </>
    );
}