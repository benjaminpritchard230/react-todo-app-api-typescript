import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Task, useCreateTaskMutation } from "../features/api/apiSlice";
interface Props {
  toggleTaskDialog: boolean;
  setToggleTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskDialog = ({ toggleTaskDialog, setToggleTaskDialog }: Props) => {
  const [input, setInput] = useState({ name: "" });
  const [createTask, { error }] = useCreateTaskMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async () => {
    try {
      await createTask(input).unwrap();
    } catch (error) {
      console.log(error);
    }
    setToggleTaskDialog(false);
  };

  return (
    <Dialog open={toggleTaskDialog}>
      <DialogTitle>Enter task name</DialogTitle>
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
            setToggleTaskDialog(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleCreateTask();
          }}
        >
          Create task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
