import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './MainNav';
import MainHeader from './MainHeader';
import Loyalty from './pages/Loyalty';

function App() {
  return (
    <div className="App">
      <Navigation />
      <MainHeader />
    </div>
  );
}

export default App;
