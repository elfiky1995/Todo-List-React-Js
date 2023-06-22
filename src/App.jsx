// mui imports
import { ThemeProvider, createTheme } from '@mui/material';
// stylesheet import
import './App.css'
// components import
import TodoList from './components/TodoList'
// react import
import { useState } from 'react';
// other libraries
import { v4 as uniqueId } from 'uuid';
// contexts import
import { TodosContext } from './contexts/todosContext';
import { SnackbarProvider } from './contexts/snackbarContext';

// control the theme of the app
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"]
  },
  palette: {
    primary: {
      main: "#1B9C85"
    }
  }
});

// initial array to contains all todos
const initialTodos = [
  {
    id: uniqueId(),
    title: "First to-do",
    body: "your first to-do is creating a to-do list.",
    accomplished: false
  }
]

function App() {
  // store initial array in state
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
