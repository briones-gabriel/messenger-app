import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField, MuiThemeProvider,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { withStyles } from "@material-ui/core/styles";
import { theme } from "./themes/theme";
import { loginStyles } from "./themes/loginStyles";
import WelcomeImage from "./components/Login/WelcomeImage";
import InputForm from "./components/Login/InputForm";

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
        <WelcomeImage classes={classes} />

        {/*Right part*/}
        <Grid container className={`${classes.background} ${classes.rightSide}`} direction="column" justify="center">
          <Grid className={classes.floatingText}>
            <Typography>Don't have an account?</Typography>
            <Button className={`${classes.btn} ${classes.btnSecondary} ${classes.shadow}`}
                    onClick={() => history.push("/register")}>Create account
            </Button>
          </Grid>

          {/*Welcome message*/}
          <Typography variant="h5" className={classes.welcomeMessage}>Welcome back!</Typography>

          {/*Form*/}
          <form onSubmit={handleLogin}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/*Username*/}
                <InputForm ariaLabel="username" label="Username" name="username" type="text"/>
                {/*Password*/}
                <InputForm label="Password" ariaLabel="password" type="password" name="password" autoComplete="on"/>
              </Grid>

              {/*Submit button*/}
              <Grid container className={classes.flex} justify="center">
                <Button type="submit" variant="contained" color="primary" size="large"
                  className={`${classes.btn} ${classes.btnPrimary}`}>Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
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
