import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField, Container, Paper, SvgIcon,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import {withStyles} from "@material-ui/core/styles";
import BackgroundImage from "./assets/bg-img.png";
import Bubble from "./assets/bubble.svg";

const styles = {
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    height: "100vh",
    width: "40vw",
    backgroundSize: "cover",
  },
  imageTitle: {
    color: "white",
    marginTop: "2rem",
  },
  buttonContainer: {
    display: "flex",
    marginTop: "4rem"
  },
  button: {
    width: "12rem",
    height: "3.5rem",
    fontFamily: "Open Sans",
    color: "white",
    backgroundColor: "#3A8DFF",
    fontSize: 16,
  },
  registerText: {
    alignItems: "center",
    top: "3rem",
    width: "60vw",
    position: "absolute",
    textAlign: "center",
    display: "inline-flex",
  },
  register: {
    color: "#3A8DFF",
    backgroundColor: "white",
    boxShadow: "0px 0px 12px 4px rgba(0,0,0,0.125)",
    position: "fixed",
    top: "2rem",
    right: "6rem",
  },
  formControl: {
    marginTop: "2rem",
  },
  welcomeMessage: {
    fontWeight: "bold",
  }
};

const Login = (props) => {
  const history = useHistory();
  const { user, login, classes } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" direction="row" alignItems="center" height="100vh">
      <Grid className={classes.background} container>
        <img src={Bubble} />
        <Typography variant="h4" className={classes.imageTitle} align="center">
          Converse with anyone in any language
        </Typography>
      </Grid>
      <Box width="60vw">
        <Grid justify="center" className={classes.registerText}>
          <Typography>Don't have an account?</Typography>
          <Button className={[classes.button, classes.register]} onClick={() => history.push("/register")}>
            Create account
          </Button>
        </Grid>
        <Grid container item justify="center">
          <form onSubmit={handleLogin}>
            <Grid>
              <Typography variant="h5" className={classes.welcomeMessage}>Welcome back!</Typography>
              <Grid>
                <FormControl fullWidth className={classes.formControl} required>
                  <TextField
                      aria-label="username"
                      label="E-mail address"
                      name="username"
                      type="text"
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl} required>
                  <TextField
                      label="Password"
                      aria-label="password"
                      type="password"
                      name="password"
                  />
                </FormControl>
              </Grid>
              <Grid justify="center" className={classes.buttonContainer}>
                <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
