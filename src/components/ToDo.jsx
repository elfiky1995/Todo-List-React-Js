/* eslint-disable react/prop-types */
// material ui imports
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
// react imports
import { useContext, useState } from "react";
// SWM Icon Pack imports
import { Check, Edit4, SWMIconProvider, Trash2 } from 'react-swm-icon-pack';
// contexts import
import { TodosContext } from "../contexts/todosContext";
import { useSnack } from "../contexts/snackbarContext";

export default function ToDo({ todo }) {

    // use state to handle dialogs
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    // use state to handle showed todos
    const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, body: todo.body });

    // use contexts we create
    const { todos, setTodos } = useContext(TodosContext);
    const { showHideSnackBar } = useSnack();

    // delete handlers
    function handleDeleteClick() {
        setShowDeleteDialog(true)
    }
    function handleDeleteDialogClose() {
        setShowDeleteDialog(false)
    }
    function handleDeleteConfirm() {
        const updatedTodo = todos.filter(t => { return t.id != todo.id })
        setTodos(updatedTodo)
        // delete todo from local storage
        localStorage.setItem("todos", JSON.stringify(updatedTodo));
        // show snackbar with custom message
        showHideSnackBar("Todo has gone!", "error");
    }

    // edit handlers
    function handleUpdateClick() {
        setShowUpdateDialog(true)
    }
    function handleUpdateDialogClose() {
        setShowUpdateDialog(false)
    }
    function handleEditConfirm() {
        const updatedtodos = todos.map(t => {
            if (t.id == todo.id) {
                return { ...t, title: updatedTodo.title, body: updatedTodo.body }
            } else {
                return t
            }
        })
        setTodos(updatedtodos);
        // save edited todo to local storage
        localStorage.setItem("todos", JSON.stringify(updatedtodos));
        handleUpdateDialogClose();
        // show snackbar with custom message
        showHideSnackBar("Edited Todo!", "info");
    }

    // function that handle accomplished status true/false
    function handleAccomplished() {
        const updatedTodo = todos.map(t => {
            if (t.id == todo.id) {
                if (t.accomplished == true) {
                    t.accomplished = false;
                    // show snackbar with custom message
                    showHideSnackBar("Oh, not completed yet!", "info");
                } else {
                    t.accomplished = true;
                    // show snackbar with custom message
                    showHideSnackBar("Marked as completed", "success");
                }
            }
            return t;
        })
        setTodos(updatedTodo);
        // add accomplished check mark to local storage
        localStorage.setItem("todos", JSON.stringify(updatedTodo));
    }

    return (
        <>
            {/* delete dialog */}
            <Dialog open={showDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle className="dialog">You want to delete this todo?</DialogTitle>
                <DialogContent>
                    <DialogContentText className="dialog">
                        If you clicked delete button, you will not be able to reverse the process.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} className="dialog">Cancel</Button>
                    <Button style={{ color: "var(--delete-color)" }} onClick={handleDeleteConfirm}>Delete</Button>
                </DialogActions>
            </Dialog>
            {/* edit dialog */}
            <Dialog open={showUpdateDialog} onClose={handleUpdateDialogClose}>
                <DialogTitle className="dialog">Update your todo</DialogTitle>
                <DialogContent>
                    you can change title or description of your todo by changing the value of fields below.
                    <TextField
                        label="title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updatedTodo.title}
                        onChange={e => { setUpdatedTodo({ ...updatedTodo, title: e.target.value }) }}
                        style={{
                            marginBottom: "20px",
                            marginTop: "20px"
                        }}
                    />
                    <TextField
                        label="description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        value={updatedTodo.body}
                        onChange={e => { setUpdatedTodo({ ...updatedTodo, body: e.target.value }) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleUpdateDialogClose} className="updateBTN-cancel">Cancel</Button>
                    <Button variant="contained" onClick={handleEditConfirm} className="updateBTN-confirm">Update</Button>
                </DialogActions>
            </Dialog>
            {/* Todos item */}
            <Card className="todo-item">
                <Grid container>
                    <Grid xs={8} item>
                        <CardContent>
                            <Typography
                                variant='h5'
                                style={{
                                    textDecoration: todo.accomplished ? "line-through" : "none",
                                    opacity: todo.accomplished ? "0.5" : "1"
                                }}
                            >{todo.title}</Typography>
                            <Typography
                                variant='p'
                                style={{
                                    textDecoration: todo.accomplished ? "line-through" : "none",
                                    opacity: todo.accomplished ? "0.5" : "1"
                                }}
                            >{todo.body}</Typography>
                        </CardContent>
                    </Grid>
                    <Grid xs={4} item>
                        {/* iconbuttons group */}
                        <CardContent className="icons-container">
                            <SWMIconProvider set="curved" size="35" strokeWidth="1">
                                {/* check button */}
                                <IconButton onClick={handleAccomplished}>
                                    <Check
                                        style={{ backgroundColor: todo.accomplished ? "var(--check-color)" : "white" }}
                                        color={todo.accomplished ? "white" : "var(--check-color)"}
                                        className="icon check"
                                    />
                                </IconButton>
                                {/* edit button */}
                                <IconButton onClick={handleUpdateClick}>
                                    <Edit4 color="var(--edit-color)" className="icon edit" />
                                </IconButton>
                                {/* delete button */}
                                <IconButton onClick={handleDeleteClick}>
                                    <Trash2 color="var(--delete-color)" className="icon delete" />
                                </IconButton>
                            </SWMIconProvider>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}