import React, { useEffect, useState } from 'react'

export default function Note() {

    const [note, setNote] = useState("loading");

    useEffect(() => {
        async function fetchNote() {
            try {
                const response = await fetch("/api/notes/note/3");
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const jsonData = await response.json();
                setNote(jsonData);
                console.log(note.name)
            } catch (error) {
                console.log(error)
            }
        }

        fetchNote();
    }, []);

    return (
        <div>
            <h3>Note</h3>
            {note &&<p> {note.text} </p>}
        </div>
    )
}
