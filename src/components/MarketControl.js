import React from 'react';
import regions from './../data/Regions'
import MarketTable from './MarketTable';

class MarketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: regions,
      // .sort((a,b) => {
      //   let sortA = a.name;
      //   let sortB = b.name;
      //   if (sortA < sortB) {
      //     return -1;
      //   } else if (sortA > sortB) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // }),
      error: null,
      isLoaded: false,
      buyOrders: [],
      sellOrders: [],
      structureArray: [],
      startSystem: null,
      marketSearch: false,
      routePlotter: false
    };
  }

  // TTT location id = 1028858195

  handleMarketSearch = (event) => {
    event.preventDefault();
    let region = event.target.regionList.value;
    let item = event.target.item.value;
    this.getItemId(region, item);
    this.setState({
      startSystem: system
    })
    setTimeout(this.addStationNameToOrder, 1500);
    setTimeout(this.accountForCitadels, 2500);
  }

  handleRouteSearch = (event) => {
    event.preventDefault();
    let startSystem = parseInt(event.target.startSystem.value)
    let endSystem = parseInt(event.target.endSystem.value)
    let safety = event.target.safety.value
  }

  searchStations = (locationArray) => {
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

  getTravelRoute = (startSystem, endSystem) => {
    if (startSystem && (startSystem !== endSystem)) {
      fetch(`https://esi.evetech.net/latest/route/${startSystem}/${endSystem}/?datasource=tranquility&flag=shortest
      `)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        console.log(jsonifiedResponse)
        return jsonifiedResponse.length
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
    } else {
      return "0"
    }
  }

  sortSell = (propToSort) => {
    const sortAsc = (a,b) => {
      let sortA = a[propToSort];
      let sortB = b[propToSort];
      if (sortA < sortB) {
        return -1;
      } else if (sortA > sortB) {
        return 1;
      } else {
        return 0;
      }
    }
    const sortDesc = (a,b) => {
      let sortA = a[propToSort];
      let sortB = b[propToSort];
      if (sortA < sortB) {
        return 1;
      } else if (sortA > sortB) {
        return -1;
      } else {
        return 0;
      }
    }
    if (this.state.sellOrders[0] !== this.state.sellOrders.sort(sortAsc)[0]) {
      this.setState({
        sellOrders: this.state.sellOrders.sort(sortAsc)
      })
    } else {
      this.setState({
        sellOrders: this.state.sellOrders.sort(sortDesc)
      })
    }
  }

  sortBuy = (propToSort) => {
    const sortAsc = (a,b) => {
      let sortA = a[propToSort];
      let sortB = b[propToSort];
      if (sortA < sortB) {
        return -1;
      } else if (sortA > sortB) {
        return 1;
      } else {
        return 0;
      }
    }
    const sortDesc = (a,b) => {
      let sortA = a[propToSort];
      let sortB = b[propToSort];
      if (sortA < sortB) {
        return 1;
      } else if (sortA > sortB) {
        return -1;
      } else {
        return 0;
      }
    }
    if (this.state.buyOrders[0] !== this.state.buyOrders.sort(sortAsc)[0]) {
      this.setState({
        buyOrders: this.state.buyOrders.sort(sortAsc)
      })
    } else {
      this.setState({
        buyOrders: this.state.buyOrders.sort(sortDesc)
      })
    }
  }

  addStationNameToOrder = () => {
    let now = new Date();
    this.setState({
      sellOrders: this.state.sellOrders.map(order => {return {...order, station: this.state.structureArray.filter(structure => structure.station_id === order.location_id)[0]["name"]}})
    })
    this.setState({
      buyOrders: this.state.buyOrders.map(order => {return {...order, station: this.state.structureArray.filter(structure => structure.station_id === order.location_id)[0]["name"]}})
    })
  }

  accountForCitadels = () => {
    this.setState({
      buyOrders: this.state.buyOrders.map(order => {
        if (order.location_id > 1000000000) {
          return {...order, station: "TTT"};
        } else {
          return order;
        }
      })
    })
    this.setState({
      sellOrders: this.state.sellOrders.map(order => {
        if (order.location_id > 1000000000) {
          return {...order, station: "TTT"};
        } else {
          return order;
        }
      })
    })
  }

  render() {

    const searchStyle1 = {
      width: "14vw",
      margin: "0 auto"
    }

    const searchStyle2 = {
      width: "26vw",
      margin: "0 auto"
    }

    if (this.state.marketSearch === true) {
      currentlyVisible = 
      <React.Fragment>
        <div style={searchStyle2}>
          <form onSubmit={this.handleMarketSearch}>
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
        </div>
        <MarketTable 
        sellOrders={this.state.sellOrders}
        buyOrders={this.state.buyOrders} 
        structureArray={this.state.structureArray}
        isLoaded={this.state.isLoaded} 
        addStationNameToOrder={this.addStationNameToOrder}
        sortSell={this.sortSell} 
        sortBuy={this.sortBuy} 
        getTravelRoute={this.getTravelRoute} 
        startSystem={this.state.startSystem} />
        {/* <p>{console.log(this.state.buyOrders)}</p> */}
        {/* <p>{console.log(this.state.sellOrders)}</p> */}
        {/* <p>{console.log(this.state.structureArray)}</p> */}
      </React.Fragment>
    } else if (this.state.routePlotter === true){
      currentlyVisible = 
      <React.Fragment>
        <form>
          <input 
          type='text'
          name='startSystem'
          placeholder='Start System' />
          <input 
          type='text'
          name='endSystem'
          placeholder='End System' />
          <button type="submit">Search</button>
        </form>
      </React.Fragment>
    }

    return (
      <React.Fragment>
        <div style={searchStyle1}>
          <button>Market Search</button>
          <button>Route Plotter</button>
        </div>
        {currentlyVisible}
      </React.Fragment>
    );
  }
}

export default MarketControl;
