import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Features from "./Features";
import Home from "./pages/Home";
import Loyalty from "./pages/Loyalty";
import GenericNotFound from "./pages/GenericNotFound";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/nft" component={Features} />
          <Route path="/loyalty" component={Features} />
          <Route component={GenericNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
