import React from "react";
import ReactDOM from "react-dom/client";

/* // Disable react devtools
import {disableReactDevtools} from "@fvilers/disable-react-devtools"; */

// MUI
import customTheme from './theme'
import {ThemeProvider} from '@mui/material/styles';

// React router dom
import {BrowserRouter} from "react-router-dom";

// My components
import App from "./App.jsx";

// CSS
import "./assets/Main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
