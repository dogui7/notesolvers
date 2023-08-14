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
    const [error, setError] = useState({error: false, status: ""});
    
    // On render, fetch the notes with a GET request and update the state
    useEffect(() => {
        async function fetchNotes() {
            try {
                const notesData = await getNotes();
                setNotes(notesData);
                setLoading(false);
            } catch (e) {
                setError({error: e.message, status: e.status});
                setLoading(false);
            }
        }
        
        setLoading(true);
        fetchNotes();
    }, []);

    return (
        <>
        <h2>Your notes</h2>
        {loading ? (
            <Grid container justifyContent="center">
                <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
            </Grid>
        ) : error.error ? (
            <h2>Error fetching data: {error.error + error.status}</h2>
        ) : notes.length === 0 ? (
            <h2>Nothing to see here! Maybe you want to add a note first?</h2>
        ) : (
            <>
            <Grid container spacing={2}>
            {notes.map((note, i) => {
                return <Note key={i} data={note} />          
            })}
            </Grid>
            </>
        )}
        </>
    )
}
