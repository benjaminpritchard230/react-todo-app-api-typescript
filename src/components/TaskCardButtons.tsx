import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import {
  Task,
  useTaskDeleteMutation,
  useTaskEditMutation,
} from "../features/api/apiSlice";
interface Props {
  task: Task;
  toggleEditDialog: boolean;
  setToggleEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCardButtons = ({
  task,
  toggleEditDialog,
  setToggleEditDialog,
}: Props) => {
  const [taskEdit] = useTaskEditMutation();
  const [taskDelete] = useTaskDeleteMutation();

  const handleDone = async () => {
    const data: Task = {
      id: task.id,
      name: task.name,
      created_on: task.created_on,
      user: task.user,
      done: !task.done,
    };
    try {
      await taskEdit(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    setToggleEditDialog(!toggleEditDialog);
  };
  const handleDelete = async () => {
    try {
      await taskDelete(task).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      direction="row"
      justifyContent={"flex-end"}
      alignItems="center"
      spacing={1}
    >
      <Tooltip title="Done" placement="top">
        <IconButton
          onClick={() => {
            handleDone();
          }}
        >
          <Avatar>
            <DoneIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit title" placement="top">
        <IconButton
          onClick={() => {
            handleEdit();
          }}
        >
          <Avatar>
            <EditIcon sx={{ "&:hover": { color: "yellow" } }} />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="top">
        <IconButton
          onClick={() => {
            handleDelete();
          }}
        >
          <Avatar>
            <DeleteIcon sx={{ "&:hover": { color: "red" } }} />
          </Avatar>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default TaskCardButtons;
