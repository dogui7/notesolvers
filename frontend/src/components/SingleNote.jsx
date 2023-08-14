// API services
import {getNote} from "../api/apiNotesService";

// useEffect and useState hook
import {useEffect, useState} from 'react'

// Loader
import HashLoader from "react-spinners/HashLoader";

// React router dom
import {useParams} from "react-router-dom";

// MUI imports
import Grid from '@mui/material/Grid';

// My components
import Note from "./Note";

export default function NotesList() {

    // State
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState();
    
    // id from parameters
    const {id} = useParams();

    // On render, fetch the notes with a GET request and update the state
    useEffect(() => {
        async function fetchNote() {
            try {
                const noteData = await getNote(id);
                setNote(noteData);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        
        setLoading(true);
        fetchNote();
    }, []);

    return (
        <>
        {loading ? (
            <Grid container justifyContent="center">
                <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
            </Grid>
        ) : (
            <>
            <h2>Your {note && note.archived && "archived"} note</h2>
            <Grid container spacing={2}>
                {note && <Note data={note}/>}
            </Grid>
            </>
        )}
        </>
    )
}
