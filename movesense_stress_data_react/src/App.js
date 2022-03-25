import './App.css';
import Navbar from './Navbar';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import Home from './Home';
import Patient from './Patient';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import useFetch from "./useFetch";


function App() {

  const title = 'Movesense';
  const { data, isPending, error } = useFetch('https://localhost:44350/patients');


  return (
    <Router>
    <div className="App">
      <Navbar />
      {/* <RightNav /> */}
      
      <div className='content'>
        
        <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
          <Route path ="/patient/:id">
            <Patient clients={data}/>
          </Route>
        </Switch>
        
      </div>
      
    </div>
    </Router>
  );
}

export default App;