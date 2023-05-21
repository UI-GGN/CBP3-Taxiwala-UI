import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./routes/RouteContainer";

const App = (): ReactElement => {

  return (
    <>
      <Router>
        <RouteContainer />
      </Router>
    </>
  );
}

export default App;
