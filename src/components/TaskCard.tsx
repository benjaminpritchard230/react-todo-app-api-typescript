import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Task } from "../features/api/apiSlice";
import EditDialog from "./EditDialog";
import TaskCardButtons from "./TaskCardButtons";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [toggleEditDialog, setToggleEditDialog] = useState(false);

  const token = useAppSelector((state) => state.auth.token);

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Grid item xs={12} md={6} lg={4} key={task.id}>
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ minHeight: 150 }}>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography gutterBottom variant="h5" component="div">
              {capitalizeString(task.name)}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {task.done ? "done" : "not done"}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions>
            <TaskCardButtons
              key={task.id}
              task={task}
              toggleEditDialog={toggleEditDialog}
              setToggleEditDialog={setToggleEditDialog}
            />
          </CardActions>
        </Card>
      </Item>
      <EditDialog
        task={task}
        toggleEditDialog={toggleEditDialog}
        setToggleEditDialog={setToggleEditDialog}
      />
    </Grid>
  );
};

export default TaskCard;
