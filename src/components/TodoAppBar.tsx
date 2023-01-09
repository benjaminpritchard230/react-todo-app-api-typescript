import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { todoApi } from "../features/api/apiSlice";
import { clearCredentials } from "../features/auth/authSlice";
type Props = {};

function TodoAppBar({}: Props) {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const token = auth.token;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(todoApi.util.invalidateTags(["Tasks"]));
    dispatch(todoApi.util.resetApiState());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            TodoApp
          </Typography>
          {token.length > 0 ? (
            <Button
              color="inherit"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TodoAppBar;
