import { ReactElement, createContext, useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./routes/RouteContainer";
import Footer from "./Components/Footer/Footer";
import HeaderBar from "./Components/Header/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ScopedCssBaseline } from '@mui/material';
import { LightMode, DarkMode } from "./colorConstants";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorContext = createContext({ toggleColor: () => {} });

const App = (): ReactElement => {
  const [mode, setMode] = useState('light');
  
  const colorMode = useMemo(
    () => ({
      toggleColor: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = createTheme({
    palette: {
      mode: mode,
      type: mode,      
      ...(mode === "light"?{
        background:{
          default: LightMode.background,
          header: LightMode.headerBackground,
        },
        primary: {
          main: LightMode.primary
        },
        typography: {
          primary: LightMode.typography.primary,
          secondary: LightMode.typography.secondary
        },
        linecolor: LightMode.linecolor
      }:
        {
          background:{
            default: DarkMode.background,
            header: DarkMode.headerBackground,
            primary: "#121212",
            secondary: "rgba(255, 255, 255, 0.08)"
          },
          primary: {
            main: DarkMode.primary
          },
          typography: {
            primary: DarkMode.typography.primary,
            secondary: DarkMode.typography.secondary
          },
          linecolor: DarkMode.linecolor
        })
    }
  });  

  return (
    <>
      <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ScopedCssBaseline enableColorScheme>
            <Router>
              <HeaderBar />
              <RouteContainer />
              <Footer/>
            </Router>
          </ScopedCssBaseline>
        </ThemeProvider>
      </ColorContext.Provider>
    </>
  );
};

export default App;
