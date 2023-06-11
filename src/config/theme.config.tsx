import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
  children: JSX.Element;
};

enum themePallette {
  BG = "#1f2029",
  LIME = "#C6FFC1",
  FONT_GLOBAL = "'JetBrains Mono', monospace",
  FONT_ROBOTO_MONO = "'Roboto Mono', monospace",
  FONT_IBM_PLEX_MONO = "'IBM Plex Mono', monospace",
  //alert styles
  ERROR_MAIN = "#f44336",
  BG_ERROR_MAIN = "rgba(224,67,54,9.1",
  SUCCESS_MAIN = "#66BB6A",
  BG_SUCCESS_MAIN = "rgba(102,187,106,0.1",
}
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: themePallette.BG,
    },
    primary: {
      main: themePallette.LIME,
    },
  },
  typography: {
    fontFamily:`${themePallette.FONT_GLOBAL}, ${themePallette.FONT_ROBOTO_MONO}, ${themePallette.FONT_IBM_PLEX_MONO}, monospace`,
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "0.5em",
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        style: {
          borderRadius: "0.8em",
          fontSize: "1em",
        },
      },
      styleOverrides: {
        standardError: {
          border: `1px solid ${themePallette.ERROR_MAIN}`,
          background: themePallette.BG_ERROR_MAIN,
        },
        standardSuccess: {
          border: `1px solid ${themePallette.SUCCESS_MAIN}`,
          background: themePallette.BG_SUCCESS_MAIN,
        },
      },
    },
    MuiListItemButton:{
      defaultProps:{
        style: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "0.5em",
        },
      },
      
    },
  },
  
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
