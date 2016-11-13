import React from 'react';
import ReactInterval from 'react-interval';
import { Grid, Row, Col, Button, PageHeader, Glyphicon, Carousel, Navbar, Nav, 
  NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';
export default class Expenditure extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
      expenditure: null,
      page : 1,
      timeout : 4000,
      enabled : this.props.enabled
    };
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext(){
    fetch('/api/expenditures?page='+this.state.page+'&limit=1')
    .then(response => response.json())
    .then((json)=> {
        this.setState({expenditure:json.docs[0],page:this.state.page+1});
        if(this.state.page > json.total){
            this.setState({enabled:false});
        }
    });
  }
  render(){
      const {expenditure,page,timeout, enabled} = this.state;
      var listGroup;
      if(expenditure!=null){
          listGroup = <ListGroup style={{textAlign:'left'}}>
                    <ListGroupItem>First Name is {expenditure.first}</ListGroupItem>
                    <ListGroupItem>Last Name is {expenditure.last}</ListGroupItem>
                    <ListGroupItem>SSN is {expenditure.ssn}</ListGroupItem>
                    <ListGroupItem>Age is {expenditure.age}</ListGroupItem>
                    <ListGroupItem>Phone numberis {expenditure.phno}</ListGroupItem>
                    <ListGroupItem>Food Expense is {expenditure.food}</ListGroupItem>
                    <ListGroupItem>Travel Expense is {expenditure.travel}</ListGroupItem>
                    <ListGroupItem>Accomodation Expense is {expenditure.accomodation}</ListGroupItem>
                    <ListGroupItem>Entertaiment Expense is {expenditure.entertaiment}</ListGroupItem>
                    <ListGroupItem>Emergency Expense is {expenditure.emergency}</ListGroupItem>
                    <ListGroupItem>Others Expense is {expenditure.other}</ListGroupItem>
                </ListGroup>
      }
        return (<div style={{height:'400px',width:'100%',textAlign:'center','verticalAlign':'middle'}}>
            <div style={{marginTop:'20px'}}>
                <ReactInterval {...{timeout, enabled}} callback={this.handleNext} />
                {listGroup}
            </div>
        </div>);
  }
}