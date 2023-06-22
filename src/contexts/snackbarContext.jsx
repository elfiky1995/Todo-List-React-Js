/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// react import
import { createContext, useContext, useState } from "react";
// components import
import SnackBar from "../components/SnackBar";

const SnackbarContext = createContext({})

export const SnackbarProvider = ({ children }) => {
    // use state to handle snackbar visibilty
    const [snackState, setSnackState] = useState({ open: false });
    // use state to handle snackbar message
    const [message, setMessage] = useState("");
    // use state to handle snackbar severity
    const [severity, setSeverity] = useState("");
    // function that handle behavior of snackbar
    function showHideSnackBar(message, severity) {
        setSnackState({ open: true });
        setMessage(message);
        setSeverity(severity)
        setTimeout(() => { setSnackState(false) }, 2000);
    }

    return (
        <SnackbarContext.Provider value={{ showHideSnackBar }}>
            <SnackBar snackState={snackState} message={message} severity={severity} />
            {children}
        </SnackbarContext.Provider>
    )
}

export const useSnack = () => {
    return useContext(SnackbarContext)
};