import React from 'react';
import { Grid, Row, Col, Button, PageHeader, Glyphicon, Carousel, Navbar, Nav, 
  NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';
import { render } from 'react-dom';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import './styles/app.scss';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { LinkContainer } from 'react-router-bootstrap';

const App = ({ children, location }) => (
  <div>
    <ReactCSSTransitionGroup
      component="div"
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {React.cloneElement(children, {
        key: location.pathname
      })}
    </ReactCSSTransitionGroup>
  </div>
)
const Index = () => (
  
  <div id="page-wrapper" className="Image">
    <Row className="welcomeRow">
        <LinkContainer to='/phase1' style={{marginRight:'10px'}}>
            <Button>Phase 1</Button>
        </LinkContainer>
        <LinkContainer to='/phase2'>
            <Button>Phase 2</Button>
        </LinkContainer>
        <h1>Expenditures</h1>
        <p>Click on the below links to navigate to phase 1 and phase 2 pages respectively.</p>
    </Row>
  </div>
)

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="phase1" component={Phase1} />
      <Route path="phase2" component={Phase2} />
    </Route>
  </Router>
), document.getElementById('main'))
