import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import * as React from "react";

import PostAddIcon from "@mui/icons-material/PostAdd";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

interface Props {
  toggleTaskDialog: boolean;
  setToggleTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FloatingActionButtons = ({
  toggleTaskDialog,
  setToggleTaskDialog,
}: Props) => {
  const handleAddClick = () => {
    setToggleTaskDialog(!toggleTaskDialog);
  };
  return (
    <Box
      sx={{
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
    >
      <Tooltip title="New post">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            handleAddClick();
          }}
        >
          <PostAddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FloatingActionButtons;
