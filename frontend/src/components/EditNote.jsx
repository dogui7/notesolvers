// useEffect and useState hook
import {useEffect, useState} from 'react'

// React router dom
import {useNavigate, useParams} from "react-router-dom";

// Loader
import HashLoader from "react-spinners/HashLoader";

// MUI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

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
                <form onSubmit={handleFormSubmit}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem >
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                            <label>Text:</label>
                            <input
                                type="text"
                                name="text"
                                value={formData.text}
                                onChange={handleInputChange}
                            />
                        </ListItem>
                    </List>
                    <button type="submit">
                        Edit
                    </button>
                </form>
            )}
        </>
    );
}