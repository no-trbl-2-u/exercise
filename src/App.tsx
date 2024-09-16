import React, { useEffect, useState } from "react";
import axios from "axios";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Box, TextField } from "@mui/material";

import "./App.css";
import Header from "./Header";

function App() {
  // Future feature: Extract into a Context driven State-Machine
  const [inputValue, setInputValue] = useState<string>("");
  const [currentTodos, setCurrentTodos] = useState<ITodo[] | []>([]);
  const [restOfTodos, setRestOfTodos] = useState<ITodo[]>([]);

  const clearSelectedTodos = () =>
    setCurrentTodos(currentTodos.filter((todo) => !todo.completed));

  // Get 10 more Todos from the API to add to the list
  const getMoreTodosHandler = () => {
    setCurrentTodos([...currentTodos, ...restOfTodos.slice(0, 10)]);

    // Remove the ten from Rest
    setRestOfTodos(restOfTodos.slice(10));
  };

  // More details for input event for better auto suggestion and type safety
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value;
    setInputValue(result);
  };

  const addCustomTodoHandler = (e) => {
    const newTodo: ITodo = {
      // Add 2 to length to make room for
      id: currentTodos.length + restOfTodos.length + 1,
      userId: 1,
      title: inputValue,
      completed: false,
    };

    const newCurrentTodos = [...currentTodos, newTodo];

    setCurrentTodos(newCurrentTodos);
    setInputValue("");
  };

  const handleToggle = (id: number) => {
    const finalArray = currentTodos.map((todo) =>
      id === todo.id ? { ...todo, completed: !todo.completed } : todo
    );

    setCurrentTodos(finalArray);
  };

  // Load Initial TODOs
  useEffect(() => {
    const getTodos = async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const firstTen: ITodo[] = result.data.slice(0, 10);
      const rest: ITodo[] = result.data.slice(10);

      setCurrentTodos(firstTen);
      setRestOfTodos(rest);
    };

    getTodos();
  }, []);

  return (
    <div className="App">
      <Header />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {currentTodos.map((todoProps) => (
          <ListItemButton onClick={() => handleToggle(todoProps.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todoProps.completed}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${todoProps.userId}`,
                }}
                id={String(todoProps.userId)}
              />
            </ListItemIcon>
            <ListItemText id={String(todoProps.id)} primary={todoProps.title} />
          </ListItemButton>
        ))}
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="todo-input"
            label="Add your todo"
            variant="outlined"
            onChange={handleInputChange}
            value={inputValue}
          />
        </Box>
      </List>
      <button onClick={clearSelectedTodos}>Delete Completed Todos</button>
      <button onClick={getMoreTodosHandler}>Get More Todos</button>
      <button onClick={addCustomTodoHandler}>Add Custom Todo</button>
    </div>
  );
}

export default App;

// TODO:
// ==> Add Loading and Error States (Spinner/Message)
// ==> Make sure Buttons Responsive
// ==> Clean up design
