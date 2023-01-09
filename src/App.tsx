import "./App.css";
import LoginPage from "./components/LoginPage";
import { Counter } from "./features/counter/Counter";
import logo from "./logo.svg";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import TaskCard from "./components/TaskCard";
import TasksPage from "./components/TasksPage";
import TodoAppBar from "./components/TodoAppBar";
import { useGetTasksQuery } from "./features/api/apiSlice";

function App() {
  const uuid = uuidv4();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#0057b7",
      },
    },
  });

  const { data: tasksData, error, isError, isLoading } = useGetTasksQuery();
  console.log(tasksData, "publicposts");

  const displayTaskCards = () => {
    if (tasksData) {
      return tasksData.map((task) => <TaskCard task={task} />);
    }
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <TodoAppBar />
        <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
          <Grid container spacing={0}>
            <Grid item xs={12}></Grid>
            <Routes>
              <Route path={"/"} element={<TasksPage key={uuid} />} />

              <Route path={"/login"} element={<LoginPage />} />
            </Routes>
          </Grid>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
