import React from 'react';
import regions from './../data/Regions'
import MarketTable from './MarketTable';

class MarketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: regions,
      error: null,
      isLoaded: false,
      buyOrders: [],
      sellOrders: [],
      structureArray: []
    };
  }

  // TTT location id = 1028858195

  handleSubmit = (event) => {
    event.preventDefault();
    let region = event.target.regionList.value;
    let item = event.target.item.value;
    this.getItemId(region, item);
  }

  searchStations = (locationArray) => {
    console.log(locationArray)
    this.setState({
      structureArray: []
    })
    locationArray.forEach((location) => {
      if (location < 100000000) {
      fetch(`https://esi.evetech.net/latest/universe/stations/${location}/?datasource=tranquility
    `).then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          structureArray: this.state.structureArray.concat(jsonifiedResponse),
          isLoaded: true
        })
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
      }
    });
  }

  getItemId = (region, item) => {
    fetch(`https://esi.evetech.net/latest/search/?categories=inventory_type&datasource=tranquility&language=en&search=${item}&strict=true
    `).then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.makeApiCall(region, jsonifiedResponse.inventory_type[0]);
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  makeApiCall = (region, item) => {
    fetch(`https://esi.evetech.net/latest/markets/${region}/orders/?datasource=tranquility&order_type=all&page=1&type_id=${item}`)
  .then(response => response.json())
  .then(
    (jsonifiedResponse) => {
      this.setState({
        buyOrders: jsonifiedResponse.filter(order => order.is_buy_order === true),
        sellOrders: jsonifiedResponse.filter(order => order.is_buy_order === false),
      });
      this.searchStations([...new Set(jsonifiedResponse.map(order => order.location_id))])
    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.regions[0].name}</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
          type='text'
          name='item'
          placeholder='Item Name' />
          <select name="regionList" id="regionList">
          {this.state.regions.map((region, index) =>
            <option value={region.id} key={index}>{region.name}</option>
            )}
          </select>
          <button type="submit">Search</button>
        </form>
        <MarketTable 
          sellOrders={this.state.sellOrders}
          buyOrders={this.state.buyOrders} 
          structureArray={this.state.structureArray}
          isLoaded={this.state.isLoaded} />
        {/* <p>{console.log(this.state.buyOrders)}</p> */}
        {/* <p>{console.log(this.state.sellOrders)}</p> */}
        <p>{console.log(this.state.structureArray)}</p>
      </React.Fragment>
    );
  }
}

export default MarketControl;
