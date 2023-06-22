/* eslint-disable react-hooks/exhaustive-deps */
// mui imports
import { Button, Card, CardContent, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
// components imports
import ToDo from './ToDo';
// react import
import { useContext, useEffect, useMemo, useState } from 'react';
// contexts import
import { TodosContext } from '../contexts/todosContext';
import { useSnack } from '../contexts/snackbarContext';
// other libraries import
import { v4 as uniqueId } from 'uuid';

export default function TodoList() {

    // use contexts we create
    const { todos, setTodos } = useContext(TodosContext);
    const { showHideSnackBar } = useSnack();

    // use state to handle "add new to-do" field
    const [titleInput, setTitleInput] = useState("");

    // use state to handle showed todos categorie
    const [displayedTodosType, setDisplayedTodosType] = useState("all");

    // retrieving todos from localstorage by useEffect
    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
    }, [])

    // function that add new entry to initialTodos array
    function handleAddBtn() {
        const newTodo = {
            id: uniqueId(),
            title: titleInput,
            body: "",
            accomplished: false
        }
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        // add new to-do to local storage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        // show snackbar with custom message
        showHideSnackBar("Added Successfully!", "success");
        // empty title field after adding todo
        setTitleInput("");
    }

    // todos filteration
    let renderedTodos;
    const completedTodos = useMemo(() => { return todos.filter(t => { return t.accomplished }) }, [todos]);
    const workingOnTodos = useMemo(() => { return todos.filter(t => { return !t.accomplished }) }, [todos]);
    if (displayedTodosType == "completed") { renderedTodos = completedTodos }
    else if (displayedTodosType == "working-on") { renderedTodos = workingOnTodos }
    else { renderedTodos = todos }
    // rendering todos according to filteration above
    const todo = renderedTodos.map(t => {
        return <ToDo key={t.id} todo={t} />
    })

    return (
        <Card className='container'>
            <CardContent className='flex'>
                <div>
                    <Typography variant='h3' style={{ fontWeight: "bold" }}>To-Do</Typography>
                    <Typography variant='h6' style={{ opacity: "0.3", fontWeight: "bold" }}>you are what you do</Typography>
                    <Divider />
                    {/* Toggle Buttons */}
                    <ToggleButtonGroup
                        style={{ marginTop: "30px" }}
                        value={displayedTodosType}
                        exclusive
                        onChange={e => { setDisplayedTodosType(e.target.value) }}
                        aria-label="text alignment"
                        color='primary'
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="working-on">Working on</ToggleButton>
                        <ToggleButton value="completed">Completed</ToggleButton>
                    </ToggleButtonGroup>
                    {/* Toggle Buttons */}
                </div>
                <div className='todo-items-container'>{(todo.length >= 1) ? todo : <p>you do not have any todos to show...</p>}</div>
                <div>
                    {/* Input Field & Add Button*/}
                    <Grid container style={{ marginTop: "30px" }}>
                        <Grid xs={8} item>
                            <TextField
                                label="todo title..."
                                variant="outlined"
                                className='add-todo'
                                style={{ marginRight: "10px" }}
                                value={titleInput}
                                onChange={(e) => { setTitleInput(e.target.value) }}
                            />
                        </Grid>
                        <Grid xs={4} item>
                            <Button
                                variant="contained"
                                className='add-todo'
                                onClick={() => { handleAddBtn() }}
                                disabled={titleInput.length == 0}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Input Field & Add Button*/}
                </div>
            </CardContent>
        </Card>
    );
}