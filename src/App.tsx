import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./routes/RouteContainer";
import Footer from "./Components/Footer/Footer";
import HeaderBar from "./Components/Header/header";

const App = (): ReactElement => {

  return (
    <>
      <Router>
        <HeaderBar />
        <RouteContainer />
        <Footer/>
      </Router>
    </>
  );
};

export default App;
