import React, { useEffect, useState } from 'react'
import Note from "./Note";

export default function NotesList() {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function fetchNote() {
            try {
                const response = await fetch("/api/notes/all");
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const jsonData = await response.json();
                setNotes(jsonData);
            } catch (error) {
                console.log(error)
            }
        }

        fetchNote();
    }, []);

    return (
        <>
        {console.log(notes)}
            <ul>
                {notes.map((note, i) => {
                    return <>
                        <li key={i}>
                            <Note key={i} data={note} pan={"rico"} />
                        </li>
                    </>
                })}
            </ul>
            {}
        </>
    )
}
