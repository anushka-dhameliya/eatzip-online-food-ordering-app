import { createTheme } from "@mui/material/styles";

export const websiteTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ededed"
        },
        secondary: {
            main: "#ededed"
        },
        black: {
            main: "#1a1919"
        },
        background: {
            main: "#ffffff",
            default: "#ffffff",
            paper: "#ffffff"
        },
        textColor: {
            main: "#1a1919"
        },
        typography: {
            fontFamily: 'Quicksand',
        },
    }
})