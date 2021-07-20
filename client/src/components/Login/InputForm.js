import { FormControl, Grid, TextField } from "@material-ui/core";
import React from "react";

const InputForm = (props) => {
  return (
    <Grid item>
      <FormControl margin="normal" fullWidth>
        <TextField label={props.label} aria-label={props.ariaLabel} type={props.type} name={props.name}
                   autoComplete={props.autoComplete} inputProps={props.inputProps} required/>
      </FormControl>
    </Grid>
  );
};

export default InputForm;