// useEffect and useState hook
import {useEffect, useState} from 'react'

// Loader
import HashLoader from "react-spinners/HashLoader";

// MUI imports
import Grid from '@mui/material/Grid';

// My components
import Note from "./Note";

export default function ArchivedNotesList() {

    // State
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    
    //On render, fetch the archived notes with a GET request and update the state
    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await fetch("/api/notes/archived");
                const jsonData = await response.json();
                setNotes(jsonData);
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
                <h3>Nothing to see here! Maybe you want to archive a note first?</h3>
            ) : (
                <>
                <h2>Archived notes</h2>
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
