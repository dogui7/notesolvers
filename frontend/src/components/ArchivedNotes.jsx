// useEffect and useState hook
import {useEffect, useState} from 'react'

// Loader
import HashLoader from "react-spinners/HashLoader";

// API services
import {getArchivedNotes} from "../api/apiNotesService";

// MUI imports
import Grid from '@mui/material/Grid';

// My components
import Note from "./Note";

export default function ArchivedNotesList() {

    // State
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState({error: false, status: ""});
    
    //On render, fetch the archived notes with a GET request and update the state
    useEffect(() => {
        async function fetchNotes() {
            try {
                const archivedNotesData = await getArchivedNotes();
                setNotes(archivedNotesData);
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
        <h2>Archived notes</h2>
        {loading ? (
            <Grid container justifyContent="center">
                <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
            </Grid>
        ) : error.error ? (
            <h2>Error fetching data: {error.error + error.status}</h2>
        ) : notes.length === 0 ? (
            <h3>Nothing to see here! Maybe you want to archive a note first?</h3>
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
