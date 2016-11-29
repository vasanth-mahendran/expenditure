import React from 'react';
import { Grid, Row, Col, Button, PageHeader, Glyphicon, Carousel, Navbar, Nav, 
  NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Pie} from 'react-chartjs-2';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import Expenditure from './Expenditure';

export default class Phase2 extends React.Component {
  constructor() {
    super();
    this.state = { 
      sliderItems: [],
      tableItems: [],
      index:0,
      direction:null,
      pieIndex:0,
      pieDirection:null,
      pieSliderItems: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      showMap:false,
      places:[],
      totalDataSize: 100,
      sizePerPage: 5,
      currentPage: 1,
      pagination: false
    };
    this.renderNavbarMenu = this.renderNavbarMenu.bind(this);
    this.handleTableRefreshNew = this.handleTableRefreshNew.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
  }

  handleTableRefreshNew(){
    fetch('/api/expenditures?page=1&limit=5')
    .then(response => response.json())
    .then((json)=> {
      this.setState({tableItems:json.docs,pagination:true});
    });
  }

  renderNavbarMenu() {
    const title = <strong><span className="glyphicon glyphicon-menu-hamburger"></span></strong>;
    return (
      <Nav className="navbar-top-links" pullRight>
        <NavDropdown title={title} noCaret style={{padding: 0}} id="userDropDown">
          <MenuItem href='#table'>Table</MenuItem>
          <MenuItem href='#interval'>Interval</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
  
  onPageChange(page, sizePerPage) {
    fetch('/api/expenditures?page='+page+'&limit='+sizePerPage)
    .then(response => response.json())
    .then((json)=> {
      this.setState(
        {
          tableItems:json.docs,
          currentPage:page
        }
      );
    });
  }

  onSizePerPageList(sizePerPage) {
    fetch('/api/expenditures?page='+this.state.currentPage+'&limit='+sizePerPage)
    .then(response => response.json())
    .then((json)=> {
      this.setState(
        {
          tableItems:json.docs,
          sizePerPage:sizePerPage
        }
      );
    });
  }

  render () {
    function priceFormatter(cell, row){
      return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }
    var table = <BootstrapTable data={this.state.tableItems} striped={true} hover={true}
            remote={ true } pagination={ this.state.pagination }
            fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
            options={ 
                { noDataText: <Button type="button" className="btn btn-default" onClick={this.handleTableRefreshNew}>
                    <Glyphicon glyph='refresh' style={{fontSize: '30px'}}/>
                  </Button>,
                  sizePerPage: this.state.sizePerPage,
                  onPageChange: this.onPageChange,
                  onSizePerPageList : this.onSizePerPageList,
                  sizePerPageList: [ 5, 10, 20 ],
                  pageStartIndex: 1,
                  page: this.state.currentPage
                } 
              }>
                <TableHeaderColumn dataField="ssn" isKey={true} dataAlign="center" dataSort={true}>SSN</TableHeaderColumn>
                <TableHeaderColumn dataField="first" dataAlign="center" dataSort={true}>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField="last" dataAlign="center" dataSort={true}>Last Name</TableHeaderColumn>
                <TableHeaderColumn dataField="age" dataAlign="center" dataSort={true}>Age</TableHeaderColumn>
                <TableHeaderColumn dataField="food" dataFormat={priceFormatter} dataSort={true}>Food</TableHeaderColumn>
                <TableHeaderColumn dataField="travel" dataFormat={priceFormatter} dataSort={true}>Travel</TableHeaderColumn>
                <TableHeaderColumn dataField="accomodation" dataFormat={priceFormatter} dataSort={true}>Accomodation</TableHeaderColumn>
                <TableHeaderColumn dataField="entertaiment" dataFormat={priceFormatter} dataSort={true}>Entertaiment</TableHeaderColumn>
                <TableHeaderColumn dataField="emergency" dataFormat={priceFormatter} dataSort={true}>Emergency</TableHeaderColumn>
                <TableHeaderColumn dataField="other" dataFormat={priceFormatter} dataSort={true}>Others</TableHeaderColumn>
            </BootstrapTable>
          
    return(
      <div id="page-wrapper" className="gray-bg" style={{marginBottom:'20px'}}>
        <div className="navigation-header-wrapper">
          <Row className="border-bottom">
            <Navbar className="navbar-static-top" bsStyle="default" style={{ marginBottom: 0, height: 60 }}>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">
                    <img
                      alt="Expenditures"
                      src="public/images/logo.png"
                      style={{height:'60px',width:'120px','marginTop':'-15px'}}
                    />
                  </a>
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse style={{ marginBottom: 0 }}>
                {this.renderNavbarMenu()}
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </div>
        <Grid>
          <Row>
            <Col xs={12}>
            <h2>Tables</h2>
            <p>To represent Expenditure data is as tables with dynamic table size and pagination,I have used react-bootstrap-table module.
            You can change the size of table by selecting a value in dropdown below table and click the page no to see the datas belongs 
            to that page.This component will make ajax call to fetch the data for table based on the table size and page number selected dynamically.
            Refer https://github.com/AllenFang/react-bootstrap-table for more detail about react-bootstrap-table</p>
            </Col>
          </Row>
          <div id='table'>
          {table}
          </div>
          <Row id="interval">
            <Col xs={12}>
            <h2>Interval</h2>
            <p>To represent all Expenditure datas from mongo in an internval,I have used react-interval module. This component
            will start to fetch the expenditure data from mongoDb after 4500 mili-seconds and refresh the data after every 
            4000 seconds with next data from the DB.
            Refer https://www.npmjs.com/package/react-interval for more detail about react-interval</p>
            </Col>
          </Row>
          <Expenditure id="interval" enabled='true'/>
        </Grid>
      </div>
      );
  }
}
