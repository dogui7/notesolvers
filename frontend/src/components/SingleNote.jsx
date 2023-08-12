// useEffect and useState hook
import {useEffect, useState} from 'react'

// Loader
import HashLoader from "react-spinners/HashLoader";

// React router dom
import {useParams} from "react-router-dom";

// MUI imports
import Grid from '@mui/material/Grid';

// My components
import Header from "./Header";
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
                console.log(id)
                const response = await fetch(`/api/notes/note/${id}`);
                const jsonData = await response.json();
                setNote(jsonData);
                console.log(jsonData)
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
        <Header/>
        {loading ? (
            <HashLoader color="#36d7b7" speedMultiplier={2.5}/>
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
