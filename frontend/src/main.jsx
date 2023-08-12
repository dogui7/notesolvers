import React from "react";

// React router dom
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// My components
import Home from "./Home.jsx";
import CreateNote from "./components/CreateNote.jsx";
import EditNote from "./components/EditNote.jsx";
import SingleNote from "./components/SingleNote.jsx";
import ArchivedNotes from "./components/ArchivedNotes.jsx";

// CSS
import "./assets/Main.css";

// Routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/archived",
        element: <ArchivedNotes/>,
    },
    {
        path: "/note/:id",
        element: <SingleNote/>,
    },
    {
        path: "/create",
        element: <CreateNote/>,
    },
    {
        path: "/edit/:id",
        element: <EditNote/>,
    },
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
