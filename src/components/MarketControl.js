import React from 'react';
import citadels from '../data/Citadels';
import MarketTable from './MarketTable';
import Route from './Route';
import MarketSearchForm from './MarketSearchForm';
import RoutePlotterForm from './RoutePlotterForm';

class MarketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: 0,
      buyOrders: [],
      sellOrders: [],
      structureArray: [],
      marketSearch: false,
      routePlotter: false,
      currentRoute: [],
      systemArray: [],
      startSystem: null,
      endSystem: null,
      noSearchResult: null,
      noRouteResult: null
    };
  }

  displayMarket = () => {
    this.setState({
      marketSearch: true,
      routePlotter: false
    })
  }

  displayRoute = () => {
    this.setState({
      marketSearch: false,
      routePlotter: true
    })
  }

  handleMarketSearch = (event) => {
    event.preventDefault();
    this.setState({
      noSearchResult: null
    })
    let region = event.target.regionList.value;
    let item = event.target.item.value;
    this.getItemId(region, item);
    setTimeout(() => this.addStationNameToOrder(), 1000);
  }

  handleRouteSearch = (event) => {
    event.preventDefault();
    this.setState({
      noRouteResult: null,
      currentRoute: [],
      systemArray: [],
      isLoaded: 0
    })
    let start = event.target.startSystem.value
    let end = event.target.endSystem.value
    this.getSystemIDs(start, "startSystem");
    this.getSystemIDs(end, "endSystem");
    let safety = event.target.safety.value;
    setTimeout(() => this.getTravelRoute(this.state.startSystem, this.state.endSystem, safety), 400);
    setTimeout(() => this.getSystemInfo(this.state.currentRoute), 700);
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
        })
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
      } else if (location > 1000000000) {
        this.setState({
          structureArray: this.state.structureArray.concat(citadels.filter(citadel => citadel.station_id === location))
        })
      }
    });
  }

  getSystemInfo = (currentRoute) => {
    this.setState({
      systemArray: []
    })
    currentRoute.forEach((system) => {
      fetch(`https://esi.evetech.net/latest/universe/systems/${system}/?datasource=tranquility&language=en

    `).then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          systemArray: this.state.systemArray.concat(jsonifiedResponse),
          isLoaded: this.state.isLoaded + 1
        })
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
    });
  }

  getItemId = (region, item) => {
    fetch(`https://esi.evetech.net/latest/search/?categories=inventory_type&datasource=tranquility&language=en&search=${item}&strict=true
    `).then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        if (jsonifiedResponse.hasOwnProperty("inventory_type")) {
          this.makeApiCall(region, jsonifiedResponse.inventory_type[0]);
        } else {
          this.setState({
            noSearchResult: `Sorry, ${item} does not exist in Eve`
          })
        }
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
        error
      });
    });
  }

  getTravelRoute = (startRoute, endRoute, safety) => {
    fetch(`https://esi.evetech.net/latest/route/${startRoute}/${endRoute}/?datasource=tranquility&flag=${safety}
    `)
  .then(response => response.json())
  .then(
    (jsonifiedResponse) => {
      this.setState({
        currentRoute: jsonifiedResponse
      })
    })
    .catch((error) => {
      this.setState({
        error
      });
    });
  }

  getSystemIDs = (systemName, stateToChange) => {
    fetch(`https://esi.evetech.net/latest/search/?categories=solar_system&datasource=tranquility&language=en&search=${systemName}&strict=true
    `)
  .then(response => response.json())
  .then(
    (jsonifiedResponse) => {
      if (jsonifiedResponse.hasOwnProperty("solar_system")) {
        this.setState({
          [stateToChange]: jsonifiedResponse.solar_system[0]
        })
      } else if (this.state.noRouteResult) {
        this.setState({
          noRouteResult: this.state.noRouteResult.concat(` or ${systemName}`)
        })
      } else {
        this.setState({
          noRouteResult: `Sorry, no results found for ${systemName}`
        })
      }
    })
    .catch((error) => {
      this.setState({
        error
      });
    });
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
    this.setState({
      sellOrders: this.state.sellOrders.map(order => {return {...order, station: this.state.structureArray.filter(structure => structure.station_id === order.location_id)[0]["name"]}})
    })
    this.setState({
      buyOrders: this.state.buyOrders.map(order => {return {...order, station: this.state.structureArray.filter(structure => structure.station_id === order.location_id)[0]["name"]}})
    })
  }

  render() {
    let currentlyVisible;
    const searchStyle = {
      maxWidth: "fit-content",
      margin: "0 auto"
    }

    const badSearch = {
      margin: "30px auto",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      maxWidth: "fit-content",
      fontSize: "40px"
    }

    if (this.state.noSearchResult) {
      currentlyVisible = 
      <React.Fragment>
        <MarketSearchForm 
        handleMarketSearch={this.handleMarketSearch} />
        <h3 style={badSearch}>{this.state.noSearchResult}</h3>
      </React.Fragment>
    } else if (this.state.noRouteResult) {
      currentlyVisible = 
      <React.Fragment>
        <RoutePlotterForm 
        handleRouteSearch={this.handleRouteSearch} />
        <h3 style={badSearch}>{this.state.noRouteResult}</h3>
      </React.Fragment>
    } else if (this.state.marketSearch === true) {
      currentlyVisible = 
      <React.Fragment>
        <MarketSearchForm 
        handleMarketSearch={this.handleMarketSearch} />
        <MarketTable 
        sellOrders={this.state.sellOrders}
        buyOrders={this.state.buyOrders} 
        structureArray={this.state.structureArray}
        isLoaded={this.state.isLoaded} 
        addStationNameToOrder={this.addStationNameToOrder}
        sortSell={this.sortSell} 
        sortBuy={this.sortBuy} 
        getTravelRoute={this.getTravelRoute} 
        startSystem={this.state.startSystem}
        noSearchResult={this.state.noSearchResult} />
      </React.Fragment>
    } else if (this.state.routePlotter === true){
      currentlyVisible = 
      <React.Fragment>
        <RoutePlotterForm 
        handleRouteSearch={this.handleRouteSearch} />
        <Route
        currentRoute={this.state.currentRoute}
        systemArray={this.state.systemArray} 
        isLoaded={this.state.isLoaded} />
      </React.Fragment>
    } 
  
    return (
      <React.Fragment>
        <div style={searchStyle}>
          <a onClick={this.displayMarket}>Market Search</a>
          <a onClick={this.displayRoute}>Route Plotter</a>
        </div>
        {currentlyVisible}
      </React.Fragment>
    );
  }
}

export default MarketControl;
