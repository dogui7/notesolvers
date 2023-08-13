// API services
import {getNotes} from "../api/apiNotesService";

// useEffect and useState hook
import {useEffect, useState} from 'react'

// Loader
import HashLoader from "react-spinners/HashLoader";

// MUI imports
import Grid from '@mui/material/Grid';

// My components
import Note from "./Note";

export default function NotesList() {

    // State
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    
    // On render, fetch the notes with a GET request and update the state
    useEffect(() => {
        async function fetchNotes() {
            try {
                const notesData = await getNotes();
                setNotes(notesData);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        
        setLoading(true);
        fetchNotes();
    }, []);

    return (
        <>
        {loading ? (
            <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
        ) : (
            notes.length === 0 ? (
                <h2>Nothing to see here! Maybe you want to add a note first?</h2>
            ) : (
                <>
                <h2>Your notes</h2>
                <Grid container spacing={2}>
                {notes.map((note, i) => {
                    return <Note key={i} data={note} />          
                })}
                </Grid>
                </>
            )
        )}
        </>
    )
}
