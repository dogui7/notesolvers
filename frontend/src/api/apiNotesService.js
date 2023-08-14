const apiDomain = import.meta.env.VITE_API_DOMAIN || "https://notesolvers-api.onrender.com";

// GET - get all notes
export const getNotes = async () => {
    const response = await fetch(`${apiDomain}/api/notes/all`);
    if (!response.ok) {
        const error = await response.json();
        throw {message: error.message, status:error.cod};
    }
    const data = await response.json();
    return data;
};

// GET - get archived notes
export const getArchivedNotes = async () => {
    const response = await fetch(`${apiDomain}/api/notes/archived`);
    if (!response.ok) {
        const error = await response.json();
        throw {message: error.message, status:error.cod};
    }
    const data = await response.json();
    return data;
};

// GET - get single note
export const getNote = async (id) => {
    const response = await fetch(`${apiDomain}/api/notes/note/${id}`);
    if (!response.ok) {
        const error = await response.json();
        throw {message: error.message, status:error.cod};
    }
    const data = await response.json();
    return data;
};

// POST - create note
export const createNote = async (data) => {
    const response = await fetch(`${apiDomain}/api/notes/addNote/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw {message: error.message, status:error.cod};
    }
};

// PUT - edit note
export const editNote = async (data, id) => {
    const response = await fetch(`${apiDomain}/api/notes/editNote/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw {message: error.message, status:error.cod};
    }
};

// DELETE - delete note
export const deleteNote = async (id) => {
    const response = await fetch(`/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        const error = await response.json();
        throw {message: error.message, status:error.cod};
    }
};