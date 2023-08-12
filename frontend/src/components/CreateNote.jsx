// useState hook
import {useState} from 'react';

// React router dom
import {useNavigate} from "react-router-dom";

// MUI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

// My components
import Header from "./Header";

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
            <List component="nav" aria-label="mailbox folders">
                <ListItem>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleInputChange}
                    />
                </ListItem>
                <Divider/>
                <ListItem>
                    <label>Text:</label>
                    <input
                        type="text"
                        name="text"
                        onChange={handleInputChange}
                    />
                </ListItem>
            </List>
            <button type="submit">Create</button>
        </form>
        </>
    );
}