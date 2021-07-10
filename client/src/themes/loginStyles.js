import BackgroundImage from "../assets/bg-img.png";
import {theme} from "./theme";

export const loginStyles = {
    form: {
        height: "100%",
        alignContent: "center",
        alignItems: "center"
    },
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
};
