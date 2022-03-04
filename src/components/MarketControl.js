import React from 'react';
import regions from './../data/Regions'

class MarketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: regions,
      error: null,
      isLoaded: false,
      ordersList: []
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const region = event.target.regionList.value;
    const item = parseInt(event.target.item.value);
    fetch(`https://esi.evetech.net/latest/markets/${region}/orders/?datasource=tranquility&order_type=sell&page=1&type_id=${item}`)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          ordersList: jsonifiedResponse
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
    // this.makeApiCall();
  }

  // makeApiCall = () => {
  //   if ((this.state.selectedRegion != null) && (this.state.selectedItem != null)) {
  //     fetch(`https://esi.evetech.net/latest/markets/${this.state.selectedRegion}/orders/?datasource=tranquility&order_type=buy&page=1&type_id=${this.state.selectedItem}`)
  //   .then(response => response.json())
  //   .then(
  //     (jsonifiedResponse) => {
  //       this.setState({
  //         isLoaded: true,
  //         ordersList: jsonifiedResponse
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         isLoaded: true,
  //         error
  //       });
  //     });
  //   }
  // }

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
        <p>{this.state.selectedItem}</p>
        <p>{console.log(this.state.ordersList)}</p>
      </React.Fragment>
    );
  }
}

export default MarketControl;
