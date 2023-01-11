import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  Task,
  useCreateTaskMutation,
  useTaskEditMutation,
} from "../features/api/apiSlice";
interface Props {
  toggleEditDialog: boolean;
  setToggleEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}

const EditDialog = ({ task, toggleEditDialog, setToggleEditDialog }: Props) => {
  const [input, setInput] = useState({ name: "" });
  const [taskEdit] = useTaskEditMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    const data: Task = {
      id: task.id,
      name: input.name,
      created_on: task.created_on,
      user: task.user,
      done: task.done,
    };
    try {
      await taskEdit(data).unwrap();
    } catch (error) {
      console.log(error);
    }
    setToggleEditDialog(false);
  };

  return (
    <Dialog open={toggleEditDialog}>
      <DialogTitle>Enter new task name</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task name"
          type="text"
          fullWidth
          variant="standard"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setToggleEditDialog(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleEdit();
          }}
        >
          Edit task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
