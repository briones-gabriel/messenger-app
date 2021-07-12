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
        <Grid className={classes.background} container>
          <Grid item xs={12} justify="center" className={classes.flex} container>
            <img src={BubbleImage} alt="Bubble"/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.imageTitle} align="center">
              Converse with anyone in any language
            </Typography>
          </Grid>
        </Grid>
        <Box justify="center" alignContent="center" alignItems="center" justifyContent="center" display="flex"
             width="60vw">
          <Box justify="right" className={classes.floatingText}>
            <Typography>Already have an account?</Typography>
            <Button
              className={`${classes.btn} ${classes.btnSecondary} ${classes.shadow}`}
              onClick={() => history.push("/login")}>Login
            </Button>
          </Box>

          <form onSubmit={handleRegister}>
            <Box height={1} maxWidth="100%">
              <Typography variant="h5" className={classes.welcomeMessage}>Create an account.</Typography>

              <Box marginBottom="2rem" width="30vw">
                <FormControl margin="normal" fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{minLength: 6}}
                    name="password"
                    autoComplete="on"
                    required
                  />
                </FormControl>
              </Box>

              <Box width="100%" justifyContent="center" display="flex">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={`${classes.btn} ${classes.btnPrimary}`}>Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
