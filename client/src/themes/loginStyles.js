import BackgroundImage from "../assets/bg-img.png";
import {theme} from "./theme";

export const loginStyles = {
    form: {
        height: "100%",
        alignContent: "center",
        alignItems: "center"
    },
    background: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
    },
    leftSide: {
        width: "40vw",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
    },
    rightSide: {
        width: "60vw",
    },
    imageTitle: {
        color: "white",
        margin: "2rem",
    },
    btn: {
        width: "12rem",
        height: "3.5rem",
    },
    btnPrimary: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
    },
    btnSecondary: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        margin: "0rem 2rem",
    },
    shadow: {
        boxShadow: "0px 0px 12px 4px rgba(0,0,0,0.125)",
    },
    floatingText: {
        alignItems: "center",
        top: "2.5rem",
        right: "2rem",
        position: "absolute",
        textAlign: "center",
        display: "inline-flex",
    },
    welcomeMessage: {
        fontWeight: "bold",
    },
    flex: {
        display: "flex"
    },
};
