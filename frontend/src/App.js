import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/Navigation/MainNavigation";

const App = () => {
  return (
    <Router className="App">
      <MainNavigation />
    </Router>
  );
};

export default App;
