import React from 'react';
import { Grid, Row, Col, Button, PageHeader, Glyphicon, Carousel, Navbar, Nav, 
  NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Pie} from 'react-chartjs-2';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
const coords = {
  lat: 37.778519,
  lng: -122.405640
};
export default class Welcome extends React.Component {
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
      places:[]
    };
    this.colors = ['#F7464A','#46BFBD','#FDB45C','#949FB1','#4D5360','#9dd49d'];
    this.highlights = ['#FF5A5E','#5AD3D1','#FFC870','#A8B3C5','#616774','#4ca24c'];
    this.labels = ['Food','Travel','Accomodation','Entertaiment','Emergency','Other']
    this.handleSliderRefresh = this.handleSliderRefresh.bind(this);
    this.handleTableRefresh = this.handleTableRefresh.bind(this);
    this.handlePieSliderRefresh = this.handlePieSliderRefresh.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePieSelect = this.handlePieSelect.bind(this);
    this.renderNavbarMenu = this.renderNavbarMenu.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleMapRefresh = this.handleMapRefresh.bind(this);
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  handlePieSelect(selectedIndex, e) {
    this.setState({
      pieIndex: selectedIndex,
      pieDirection: e.direction
    });
  }

  handleSliderRefresh(){
    fetch('/getexpenditure')
    .then(response => response.json())
    .then((json)=> {
      this.setState({sliderItems:json.expenditures});
    });
  }

  handleTableRefresh(){
    fetch('/getexpenditure')
    .then(response => response.json())
    .then((json)=> {
      this.setState({tableItems:json.expenditures});
    });
  }

  handleMapRefresh(){
    fetch('/getexpenditure')
    .then(response => response.json())
    .then((json)=> {
      this.setState({places:json.places,showMap:true});
    });
  }

  handlePieSliderRefresh(){
    fetch('/getexpenditure')
    .then(response => response.json())
    .then((json)=> {
      this.setState({pieSliderItems:json.expenditures});
    });
  }

  renderNavbarMenu() {
    const title = <strong><span className="glyphicon glyphicon-menu-hamburger"></span></strong>;
    return (
      <Nav className="navbar-top-links" pullRight>
        <NavDropdown title={title} noCaret style={{padding: 0}} id="userDropDown">
          <MenuItem href='#slider'>Slider</MenuItem>
          <MenuItem href='#table'>Table</MenuItem>
          <MenuItem href='#chart'>Charts</MenuItem>
          <MenuItem href='#map'>Maps</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
  getChartData(item,idx){
    var data = {};
    var keys = Object.keys(item);
    keys.splice(0,1);
    var values = keys.map(function(v) { return item[v]; });
    data.labels = this.labels;
    data.datasets = [{data:values,backgroundColor:this.colors,hoverBackgroundColor:this.highlights}]
    return data;
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }
 
  onDragEnd(e) {
    console.log('onDragEnd', e);
  }
 
  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render () {
    var carouselContent;
    if(this.state.sliderItems.length==0){
      carouselContent = <Carousel.Item>
              <div style={{height:'300px',width:'100%',textAlign:'center'}}>
                <Button type="button" className="btn btn-default" onClick={this.handleSliderRefresh}>
                  <Glyphicon glyph='refresh' style={{fontSize: '30px'}}/>
                </Button>
              </div>
              <Carousel.Caption>
                <h3>Expenditure Data</h3>
                <p>Click the refresh button to know the expenditure data of your friends</p>
              </Carousel.Caption>
            </Carousel.Item>;
    }else{
      carouselContent = this.state.sliderItems.map((item,idx)=>
      {
        return <Carousel.Item>
              <div style={{height:'400px',width:'100%',textAlign:'center','verticalAlign':'middle'}}>
                <div style={{marginTop:'20px'}}>
                  <ListGroup style={{textAlign:'left'}}>
                    <ListGroupItem>Food Expense is {item.food}</ListGroupItem>
                    <ListGroupItem>Travel Expense is {item.travel}</ListGroupItem>
                    <ListGroupItem>Accomodation Expense is {item.accomodation}</ListGroupItem>
                    <ListGroupItem>Entertaiment Expense is {item.entertaiment}</ListGroupItem>
                    <ListGroupItem>Emergency Expense is {item.emergency}</ListGroupItem>
                    <ListGroupItem>Others Expense is {item.other}</ListGroupItem>
                  </ListGroup>
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

    var pieCarouselContent;
    if(this.state.pieSliderItems.length==0){
      pieCarouselContent = <Carousel id='chart' activeIndex={this.state.pieIndex} direction={this.state.pieDirection} onSelect={this.handlePieSelect}
          className='jumbotron'>
              <Carousel.Item>
                <div style={{height:'300px',width:'100%',textAlign:'center'}}>
                  <Button type="button" className="btn btn-default" onClick={this.handlePieSliderRefresh}>
                    <Glyphicon glyph='refresh' style={{fontSize: '30px'}}/>
                  </Button>
                </div>
                <Carousel.Caption>
                  <h3>Expenditure Data</h3>
                  <p>Click the refresh button to know the expenditure data of your friends</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>;
    }else{
      pieCarouselContent = this.state.pieSliderItems.map((item,idx)=>
      {
        var data = this.getChartData(item,idx);
        return <Carousel.Item>
                <div style={{height:'650px',width:'100%',textAlign:'center','verticalAlign':'middle'}}>
                  <Pie data={data}/>
                </div>
                <Carousel.Caption>
                  <h3>Expenditure data</h3>
                  <p>Check the expenditures of {item.name}</p>
                </Carousel.Caption>
              </Carousel.Item>;
      }
      )
      pieCarouselContent = <Carousel id='chart' style={{height:'700px'}} activeIndex={this.state.pieIndex} direction={this.state.pieDirection} onSelect={this.handlePieSelect}
          className='jumbotron'>{pieCarouselContent}</Carousel>
    }
    var googleMap;
    if(this.state.showMap){
      googleMap = <Gmaps id="map" className="map"
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{v: '3.exp'}}
        onMapCreated={this.onMapCreated}>
        {this.state.places.map(function(place,idx) {
          return <Marker
            lat={place.lat}
            lng={place.lng}
            draggable={true}
            onDragEnd={this.onDragEnd} />
        },this)}
        {this.state.places.map(function(place,idx) {
          return <InfoWindow
            lat={place.lat}
            lng={place.lng}
            content={'Hello, React :)'}
            onCloseClick={this.onCloseClick} />
        },this)}
      </Gmaps>
    }else{
      googleMap = <Button id="map" type="button" className="btn btn-default" onClick={this.handleMapRefresh}>
        <Glyphicon glyph='refresh' style={{fontSize: '30px'}}/>
      </Button>
    }

    function priceFormatter(cell, row){
      return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }
    return(
      <div id="page-wrapper" className="gray-bg" style={{marginBottom:'20px'}}>
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
          <Row>
            <Col xs={12}>
            <h2>Sliders</h2>
            <p>To represent Expenditure data is as sliders,I have used Bootstrap controlled carousel.Refer 
            http://react-bootstrap.github.io/components.html#carousels for more detail about bootstrap carousel</p>
            </Col>
          </Row>
          <Carousel id='slider' activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}
          className='jumbotron'>
            {carouselContent}
          </Carousel>
          <Row>
            <Col xs={12}>
            <h2>Tables</h2>
            <p>To represent Expenditure data is as tables,I have used react-bootstrap-table module.Refer 
            https://github.com/AllenFang/react-bootstrap-table for more detail about react-bootstrap-table</p>
            </Col>
          </Row>
          <div id='table'>
            <BootstrapTable data={this.state.tableItems} striped={true} hover={true}
            options={ { noDataText: <Button type="button" className="btn btn-default" onClick={this.handleTableRefresh}>
                    <Glyphicon glyph='refresh' style={{fontSize: '30px'}}/>
                  </Button> } }>
                <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="food" dataFormat={priceFormatter} dataSort={true}>Food</TableHeaderColumn>
                <TableHeaderColumn dataField="travel" dataFormat={priceFormatter} dataSort={true}>Travel</TableHeaderColumn>
                <TableHeaderColumn dataField="accomodation" dataFormat={priceFormatter} dataSort={true}>Accomodation</TableHeaderColumn>
                <TableHeaderColumn dataField="entertaiment" dataFormat={priceFormatter} dataSort={true}>Entertaiment</TableHeaderColumn>
                <TableHeaderColumn dataField="emergency" dataFormat={priceFormatter} dataSort={true}>Emergency</TableHeaderColumn>
                <TableHeaderColumn dataField="other" dataFormat={priceFormatter} dataSort={true}>Others</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <Row>
            <Col xs={12}>
            <h2>Charts</h2>
            <p>To represent Expenditure data is as charts,I have used react-chartjs-2 module.Refer 
            https://www.npmjs.com/package/react-chartjs-2 for more detail about react-chartjs-2</p>
            </Col>
          </Row>
          {pieCarouselContent}
          <Row>
            <Col xs={12}>
            <h2>Google Maps</h2>
            <p>To represent Expenditure data trip laces is as google map,I have used react-gmaps module.Refer 
            https://www.npmjs.com/package/react-gmaps for more detail about react-gmaps</p>
            </Col>
          </Row>
          {googleMap}
        </Grid>
      </div>
      );
  }
}
