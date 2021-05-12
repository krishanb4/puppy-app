
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./MainNav";
import Features from "./Features";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Navigation} />
          <Route path="/features" component={Features} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
