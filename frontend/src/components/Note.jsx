import React, { useEffect, useState } from 'react'

export default function Note(props) {

    /* const [note, setNote] = useState("loading");

    useEffect(() => {
        async function fetchNote() {
            try {
                const response = await fetch("/api/notes/note/3");
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const jsonData = await response.json();
                setNote(jsonData);
            } catch (error) {
                console.log(error)
            }
        }

        fetchNote();
    }, []); */

    return (
        <div>
            <h3> {props.data.title}</h3>
            <p> {props.data.text} </p>
            <p> {props.pan} </p>
        </div>
    )
}
