import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import CreateNote from './components/CreateNote.jsx'
import EditNote from './components/EditNote.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/create",
    element: <CreateNote/>
  },
  {
    path: "/edit/:id",
    element: <EditNote/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
