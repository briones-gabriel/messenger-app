import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  MuiThemeProvider,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { withStyles } from "@material-ui/core/styles";
import { loginStyles } from "./themes/loginStyles";
import { theme } from "./themes/theme";
import BubbleImage from "./assets/bubble.svg";
import WelcomeImage from "./components/Login/WelcomeImage";
import InputForm from "./components/Login/InputForm";

const styles = loginStyles;

const Login = (props) => {
  const history = useHistory();
  const {user, register, classes} = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({username, email, password});
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
            <Typography>Already have an account?</Typography>
            <Button className={`${classes.btn} ${classes.btnSecondary} ${classes.shadow}`}
                    onClick={() => history.push("/login")}>Login
            </Button>
          </Grid>

          {/*Create account message*/}
          <Typography variant="h5" className={classes.welcomeMessage}>Create an account.</Typography>

          {/*Form*/}
          <form onSubmit={handleRegister}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/*Username*/}
                <InputForm ariaLabel="username" label="Username" name="username" type="text"/>
                {/*E-mail*/}
                <InputForm label="E-mail address" ariaLabel="e-mail address" type="email" name="email"/>
                {/*Password*/}
                <InputForm label="Password" ariaLabel="password" type="password" name="password" autoComplete="on" inputProps={{minLength: 6}}/>
              </Grid>

              {/*Submit button*/}
              <Grid container className={classes.flex} justify="center">
                <Button type="submit" variant="contained" color="primary" size="large"
                        className={`${classes.btn} ${classes.btnPrimary}`}>Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
