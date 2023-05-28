import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./routes/RouteContainer";
import Footer from "./Components/Footer/Footer";

const App = (): ReactElement => {

  return (
    <>
      <Router>
        <RouteContainer />
        <Footer/>
      </Router>
    </>
  );
}

export default App;
