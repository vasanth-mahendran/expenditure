import React from 'react';
import { Grid, Row, Col, Button, PageHeader, Glyphicon, Carousel, Navbar, Nav, 
  NavDropdown, MenuItem  } from 'react-bootstrap';
import ReactTable from 'react-table';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = { 
      items: [],
      index:0,
      direction:null,
      columns:[
        {
          header:'Name',
          accessor: 'name'
        },
        {
          header:'Food',
          accessor: 'food'
        },
        {
          header:'Travel',
          accessor: 'travel'
        },
        {
          header:'Accomodation',
          accessor: 'accomodation'
        },
        {
          header:'Entertaiment',
          accessor: 'entertaiment'
        },
        {
          header:'Emergency',
          accessor: 'emergency'
        },
        {
          header:'Others',
          accessor: 'other'
        }
      ]
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderNavbarMenu = this.renderNavbarMenu.bind(this);
  }
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  handleRefresh(){
    fetch('/getexpenditure')
    .then(response => response.json())
    .then((json)=> {
      this.setState({items:json.expenditures});
    });
  }
  renderNavbarMenu() {
    const title = <strong><span className="glyphicon glyphicon-menu-hamburger"></span></strong>;
    return (
      <Nav className="navbar-top-links" pullRight style={{backgroundColor:'#2b336b'}}>
        <NavDropdown title={title} noCaret style={{padding: 0}} id="userDropDown">
          <MenuItem href='#slider'>Slider</MenuItem>
          <MenuItem href='#table'>Table</MenuItem>
          <MenuItem href='#chart'>Charts</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
  render () {
    var carouselContent;
    if(this.state.items.length==0){
      carouselContent = <Carousel.Item>
              <div style={{height:'300px',width:'100%',textAlign:'center'}}>
                <Button type="button" className="btn btn-default" onClick={this.handleRefresh}>
                  <Glyphicon glyph='refresh'/>
                </Button>
              </div>
              <Carousel.Caption>
                <h3>Expenditure Data</h3>
                <p>Click the refresh button to know the expenditure data of your friends</p>
              </Carousel.Caption>
            </Carousel.Item>;
    }else{
      carouselContent = this.state.items.map((item,idx)=>
      {
        return <Carousel.Item>
              <div style={{height:'300px',width:'100%',textAlign:'center','verticalAlign':'middle'}}>
                <div style={{marginTop:'20px'}}>
                  Food Expense is {item.food}
                  <br/>
                  Travel Expense is {item.travel}
                  <br/>
                  Entertaiment Expense is {item.entertaiment}
                </div>
              </div>
              <Carousel.Caption>
                <h3>Expenditure data</h3>
                <p>Check the expenditures of {item.name}</p>
              </Carousel.Caption>
            </Carousel.Item>;
      }
      )
    }
    function priceFormatter(cell, row){
      return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }
    return(
      <div id="page-wrapper" className="gray-bg">
        <div className="navigation-header-wrapper">
          <Row className="border-bottom">
            <Navbar className="navbar-static-top" bsStyle="default" style={{ marginBottom: 0, height: 60 }}>
              <Navbar.Header>
                <Navbar.Brand>
                  <img
                    alt="Expenditures"
                    src="public/images/logo.png"
                    style={{height:'60px',width:'120px'}}
                  />
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse style={{ marginBottom: 0 }}>
                {this.renderNavbarMenu()}
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </div>
        <Grid>
          <Carousel id='slider' activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}
          className='jumbotron'>
            {carouselContent}
          </Carousel>
          <ReactTable
            data={this.state.items}
            columns={this.state.columns}
          />
        </Grid>
      </div>
      );
  }
}
