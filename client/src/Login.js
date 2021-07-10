import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField, MuiThemeProvider,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { withStyles } from "@material-ui/core/styles";
import BubbleImage from "./assets/bubble.svg";
import { theme } from "./themes/theme";
import { loginStyles } from "./themes/loginStyles";

const styles = loginStyles;

const Login = (props) => {
  const history = useHistory();
  const {user, login, classes} = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({username, password});
  };

  if (user.id) {
    return <Redirect to="/home"/>;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="row" height={1} width={1}>
        <Grid item className={classes.background} container>
          <img src={BubbleImage} alt="Bubble" />
          <Typography variant="h4" className={classes.imageTitle} align="center">
            Converse with anyone in any language
          </Typography>
        </Grid>
        <Box item justify="center" alignContent="center" alignItems="center" justifyContent="center" display="flex"
             width="60vw">
          <Box item justify="right" className={classes.floatingText}>
            <Typography>Don't have an account?</Typography>
            <Button
              className={[classes.btn, classes.btnSecondary, classes.shadow]}
              onClick={() => history.push("/register")}>Create account
            </Button>
          </Box>

          <form onSubmit={handleLogin}>
            <Box height={1} maxWidth="100%">
              <Typography variant="h5" className={classes.welcomeMessage}>Welcome back!</Typography>

              <Box marginBottom="2rem" width="30vw">
                <FormControl margin="normal" required fullWidth>
                  <TextField aria-label="username" label="E-mail address" name="username" type="text"/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField label="Password" aria-label="password" type="password" name="password"/>
                </FormControl>
              </Box>

              <Box width="100%" justifyContent="center" display="flex">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={[classes.btn, classes.btnPrimary]}>
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Grid>
    </MuiThemeProvider>
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
