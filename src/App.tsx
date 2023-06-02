import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./routes/RouteContainer";
import Footer from "./Components/Footer/Footer";
import HeaderBar from "./Components/Header/header";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: "#ffa03e"
    },
    text:{
      primary: "#ffa03e"
    },
    typography: {
      primary: "#838383"
    },
    secondary: {
      main: "#7D7D7D"
    }
  },
  typography: {
    // h3:{
    //   color:"blue"
    // }
  }
});


const App = (): ReactElement => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <HeaderBar />
          <RouteContainer />
          <Footer/>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
