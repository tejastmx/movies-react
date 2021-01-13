import "./App.css";
import Main from "./components/Main.jsx";
import Trailor from "./components/Trailor.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
    
      <Trailor />
      <Main />
    </div>
  );
}

export default App;
