const apiDomain = import.meta.env.VITE_API_DOMAIN;

// GET - get all notes
export const getNotes = async () => {
    try {
        const response = await fetch(`${apiDomain}/api/notes/all`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// GET - get archived notes
export const getArchivedNotes = async () => {
    try {
        const response = await fetch(`${apiDomain}/api/notes/archived`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// GET - get single note
export const getNote = async (id) => {
    try {
        const response = await fetch(`${apiDomain}/api/notes/note/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// POST - create note
export const createNote = async (data) => {
    try {
        const response = await fetch(`${apiDomain}/api/notes/addNote/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        throw error;
    }
};

// PUT - edit note
export const editNote = async (data, id) => {
    try {
        const response = await fetch(`${apiDomain}/api/notes/editNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        throw error;
    }
};

// DELETE - delete note
export const deleteNote = async (id) => {
    try {
        const response = await fetch(`/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        throw error;
    }
};
