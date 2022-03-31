import './App.scss';
import Navbar from './Navbar';
import Grid, { Container, Row, Col } from "react-bootstrap"
import Home from './Home';
import Patient from './Patient';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import useFetch from "./useFetch";




function App() {

  const { data } = useFetch('https://localhost:44350/patients');


  return (
    <Router>
    <div className="App">
    <Container>
      <Row md={4}>
        <Col xs={6} className="maxheight"><Navbar /></Col>
        <Col xs={6} className="grid-container--fit">
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
        </Col>
        
      </Row>
    </Container>
      
      {/* <RightNav /> */}
      
      
      
    </div>
    </Router>
  );
}

export default App;