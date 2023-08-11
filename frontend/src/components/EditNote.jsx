import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import HashLoader from "react-spinners/HashLoader";
import Header from "./Header";

function PostRequest() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category_id: 0,
    });

    // id from parameters
    const {id} = useParams();

    // using navigate to go to home after editing
    const navigate = useNavigate()

    // onRender, find the note to edit
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

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

        navigate("/");
    };

    return (
        <div>
            <Header/>
            <h2>Edit note</h2>
            {loading ? (
                <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
            ) : (
                <>
                <form onSubmit={handleSubmit}>
                    <List bgcolor='background.paper'component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
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
                </>
            )}
            
        </div>
    );
}

export default PostRequest;
