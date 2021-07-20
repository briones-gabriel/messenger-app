import { Grid, Typography } from "@material-ui/core";
import BubbleImage from "../../assets/bubble.svg";

const WelcomeImage = ({ classes }) => {
  return (
    <Grid className={`${classes.background} ${classes.leftSide}`} container>
      <Grid item xs={12} justify="center" className={classes.flex} container>
        <img src={BubbleImage} alt="Bubble"/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.imageTitle} align="center">
          Converse with anyone in any language
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeImage;