import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGetTasksQuery } from "../features/api/apiSlice";
import TaskCard from "./TaskCard";
type Props = {};

const TasksPage = (props: Props) => {
  const { data: tasksData, error, isError, isLoading } = useGetTasksQuery();
  console.log(tasksData, "publicposts");

  const displayTaskCards = () => {
    if (tasksData) {
      return tasksData.map((task) => <TaskCard key={task.id} task={task} />);
    }
  };
  return <>{displayTaskCards()}</>;
};

export default TasksPage;
