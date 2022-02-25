import React from 'react';
import regions from './../data/Regions'

class MarketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: regions,
      selectedItem: 34,
      selectedRegion: 10000002,
      error: null,
      isLoaded: false,
      ordersList: []
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const region = event.target.regionList.value;
    const item = parseInt(event.target.item.value);
    this.setState({
      selectedRegion: region,
      selectedItem: item
    });
    this.makeApiCall();
  }

  makeApiCall = () => {
    fetch(`https://esi.evetech.net/latest/markets/${this.state.selectedRegion}/orders/?datasource=tranquility&order_type=buy&page=1&type_id=${this.state.selectedItem}`)
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
          {this.state.regions.map(region =>
            <option value={region.id}>{region.name}</option>
            )}
          </select>
          <button type="submit">Search</button>
        </form>
        <p>{this.state.selectedItem}</p>
        <p>{this.state.selectedRegion}</p>
        <p>{console.log(this.state.ordersList)}</p>
      </React.Fragment>
    );
  }
}

export default MarketControl;
