import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Features from "./Features";
import Home from "./pages/Home";
import Loyalty from "./pages/Loyalty";
import GenericNotFound from "./pages/GenericNotFound";
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/nft">
            <Features />
          </Route>
          <Route path="/loyalty">
            <Features />
          </Route>
          <Route>
            <GenericNotFound />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
