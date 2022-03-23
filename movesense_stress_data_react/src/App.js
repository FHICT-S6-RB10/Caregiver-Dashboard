import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Patient from './Patient';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  const title = 'Movesense';

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className='content'>
        
        <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
          <Route path ="/patient/:id">
            <Patient />
          </Route>
        </Switch>
        
      </div>
    </div>
    </Router>
  );
}

export default App;