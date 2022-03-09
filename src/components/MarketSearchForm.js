import React from 'react';
import regions from './../data/Regions';

function MarketSearchForm(props) {
  const searchStyle = {
    maxWidth: "fit-content",
    margin: "0 auto"
  }

  return (
    <React.Fragment>
      <div style={searchStyle}>
        <form onSubmit={props.handleMarketSearch}>
          <input 
          type='text'
          name='item'
          placeholder='Item Name' />
          <select name="regionList" id="regionList">
            {regions.map((region, index) =>
              <option value={region.id} key={index}>{region.name}</option>
            )}
          </select>
          <button type="submit">Search</button>
        </form>
      </div>    
    </React.Fragment>
  );
}

export default MarketSearchForm;
