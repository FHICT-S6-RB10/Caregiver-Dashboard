import './App.scss';
import Navbar from './Navbar';
import Grid, { Container, Row, Col } from "react-bootstrap"
import Home from './Home';
import Patient from './Patient';
import StressData from './StressData';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import useFetch from "./useFetch";




function App() {

  const { data } = useFetch('https://localhost:5001/patients');

  const { data:stressdata } = useFetch('https://localhost:5001/stressmeasurements');

  return (
    <Router>
    <div className="App">
    <Container>
      <Row md={4}>
        <Col xs={6} className="maxheight"><Navbar patients={data}/></Col>
        <Col xs={6} className="grid-container--fit">
          <div className='content'>
            <Switch>
              <Route exact path ="/">
                <Home />
              </Route>
              <Route path ="/patient/:id">
                <Patient clients={data} stressData={stressdata}/>
              </Route>
            </Switch>
          </div>
        </Col>
        
      </Row>
    </Container>
      
      {/* <RightNav /> */}
      
      
      
    </div>
    </Router>
  );
}

export default App;