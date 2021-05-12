import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './MainNav';
import Features from './Features';
import Loyalty from './pages/Loyalty.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation></Navigation>
        <Switch>
          <Route path="/features" component={Features} />
          <Route path="/loyalty" component={Loyalty} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
