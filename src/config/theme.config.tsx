import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
  children: JSX.Element;
};

enum themePallette {
  BG = "#1f2029",
  LIME = "#C6FFC1",
  FONT_GLOBAL = "'JetBrains Mono', monospace",
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
    fontFamily: themePallette.FONT_GLOBAL,
  },
  components:{
    MuiButton:{
        defaultProps:{
            style:{
                textTransform:"none",
                boxShadow:"none",
                borderRadius:"0.5em"
            }
        }
    }
  }
});

export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
  
};

