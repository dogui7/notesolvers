import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

function PostRequest() {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        category_id: 0,
    });

    const navigate = useNavigate()
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

        navigate("/");
    };

    return (
        <div>
            <Header/>
            <h2>Create new note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Text:</label>
                    <input
                        type="text"
                        name="text"
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}

export default PostRequest;
