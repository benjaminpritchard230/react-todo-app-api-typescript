import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { List, ListItem, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { useLoginMutation } from "../features/api/apiSlice";
import { setCredentials } from "../features/auth/authSlice";

interface Props {
  props: any;
}

interface Target {
  target: {
    name: string;
    value: string;
  };
}

function Copyright({ props }: Props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }: Target) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleLoginClick = async () => {
    try {
      const user = await login(formState).unwrap();
      dispatch(setCredentials(user));
      navigate("/");
      console.log(user, "user");
    } catch (err) {
      console.log(err);
    }
  };

  const auth = useAppSelector((state) => state.auth);
  const token = auth.token;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography component="h1" variant="h5">
            Token:{token}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleLoginClick();
              }}
            >
              Sign In
            </Button>
            <List>
              <ListItem>
                <ListItemText>list item text</ListItemText>
              </ListItem>
            </List>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
