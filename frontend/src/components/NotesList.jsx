import React, { useEffect, useState, CSSProperties } from 'react'
import HashLoader from "react-spinners/HashLoader";
import Note from "./Note";
import Grid from '@mui/material/Grid';


export default function NotesList() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        async function fetchNote() {
            try {
                const response = await fetch("/api/notes/all");
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const jsonData = await response.json();
                setNotes(jsonData);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchNote();
    }, []);

    return (
        <>
            {loading ? (
                <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
            ) : (
                <Grid container spacing={2}>
                    {notes.map((note, i) => {
                        return <Note key={i} data={note} />          
                    })}
                </Grid>
            )}
        </>
    )
}
