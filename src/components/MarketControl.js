import React from 'react';
import regions from './../data/Regions'

class MarketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: regions,
      selectedItem: null,
      selectedRegion: null
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const region = event.target.regionList.value;
    const item = event.target.item.value;
    if (region != null && item != null) {
      this.setState({
        selectedItem: item,
        selectedRegion: region
      });
    }
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
      </React.Fragment>
    );
  }
}

export default MarketControl;
