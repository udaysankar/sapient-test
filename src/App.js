import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Fab,
  Container,
  Checkbox,
  Slider
} from "@mui/material";
import { Color, ColorPicker, createColor } from "material-ui-color";
import { CssBaseline } from "@mui/material";
import UserAction from "./redux/action/UserAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

function App(props) {
  const [user, setUser] = useState(undefined);
  const [color, setColor] = useState(createColor("red"));
  const [email, setEmail] = useState(undefined);
  const { actions, users } = props;
  useEffect(() => {
    if (users.user) {
      // console.log(users.user.primaryColor);
      setColor(users.user.primaryColor);
      setUser(users.user);
    }
    // console.log("changed------------", user);

    // actions.getUsers(user);
  }, [users]);
  const handleChange = (e) => {
    console.log(e);
    setEmail(e.target.value);
  };

  const handleColorChange = (e) => {
    console.log(e);
    setColor(e);
    actions.updatePrimaryColor({
      email: user.email,
      name: user.name,
      primaryColor: "#" + e.hex,
    });
  };

  const login = () => {
    console.log("logging in", email);
    // setEmail(email)
    actions.getUserByEmail(email);
  };

  const logout = () => {
    console.log("logging in", email);
    // setEmail(email)
    setUser(undefined);
  };
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

  const innerTheme = createTheme({
    palette: {
      primary: {
        main: user ? user.primaryColor : orange[500],
      },
    },
  });
  return (
    <div className="App">
      <CssBaseline />
      {!user && (
        <ThemeProvider theme={outerTheme}>
          <>
            <Container>
              <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Please login to check your theme
                </Typography>
                <TextField
                  id="username"
                  type={"text"}
                  onChange={handleChange}
                ></TextField>
                <div className="mt-20">
                  <Button variant="contained" onClick={login}>
                    Login
                  </Button>
                </div>
              </Box>
            </Container>
          </>
        </ThemeProvider>
      )}
      {user && (
        <ThemeProvider theme={innerTheme}>
          <Box>
            Logged in as {user.name} with email Id {user.email}{" "}
            <Button variant="contained" onClick={logout}>
              LogOut
            </Button>
            <div className="mt-20 color-picker">
              <ColorPicker  value={color} onChange={handleColorChange} />
            </div>
            <div className="mt-20">
              <Typography variant="h5" component="h5" gutterBottom>
                Components with Theme Color
              </Typography>
              <div className="mt-20">
                <Checkbox className="m-20" defaultChecked />
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
                <Fab className="m-20" color="primary" aria-label="edit">
                  <EditIcon />
                </Fab>
                <Fab className="m-20" color="primary" variant="extended">
                  <NavigationIcon sx={{ mr: 1 }} />
                  Navigate
                </Fab>
                <Fab className="m-20" color="primary" aria-label="like">
                  <FavoriteIcon />
                </Fab>

              </div>
              <div>
              <Slider className="m-20 w-50" aria-label="Volume" color="primary" value={30} onChange={handleChange} />

              </div>
            </div>
            <div></div>
          </Box>
        </ThemeProvider>
      )}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(UserAction), dispatch),
});

const mapStateToProps = ({ User }) => {
  return {
    users: User,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
