import React from 'react';

function MarketTable(props) {
  let sellTable;
  let buyTable;
  let now = new Date();

  const tableDiv = {
    width: "60vw",
    height: "30vh",
    margin: "0 auto",
    overflow: "scroll",
    border: "1px solid black",
    textAlign: "left"
  }

  function filterLocation(structureArray, locationID) {
    let result = structureArray.filter(structure => structure.station_id === locationID);
    let resultHolder = (result[0] || {"name": "TTT"});
    return resultHolder.name
  }

  function timeifier(start, duration) {
    let result = '';
    let startPoint = new Date(start);
    let diff = ((duration * 86400000) - (now - startPoint));
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (days > 0) {
      result += `${days}d `; 
    }
    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m `;
    }
    if (seconds > 0) {
      result += `${seconds}s `;
    }
    return result;
  }
  if (props.sellOrders.length > 0) {
    sellTable = 
      <div style={tableDiv}>
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Range</th>
              <th>Expires In</th>
            </tr>
          </thead>
          <tbody>
            {props.sellOrders.map((order, index) => 
              <tr key={index}>
                <td>{order.volume_remain}</td>
                <td>{order.price}</td>
                <td>{props.isLoaded ? filterLocation(props.structureArray, order.location_id) : "Loading..."}</td>
                <td>{order.range}</td>
                <td>{timeifier(order.issued, order.duration)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>;
  } else {
    sellTable = "no sell orders"
  }
  if (props.buyOrders.length > 0) {
    buyTable = 
    <div style={tableDiv}>
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Range</th>
              <th>Min Volume</th>
              <th>Expires In</th>
            </tr>
          </thead>
          <tbody>
            {props.sellOrders.map((order, index) => 
              <tr key={index}>
                <td>{order.volume_remain}</td>
                <td>{order.price}</td>
                <td>{props.isLoaded ? filterLocation(props.structureArray, order.location_id) : "Loading..."}</td>
                <td>{order.range}</td>
                <td>{order.min_volume}</td>
                <td>{timeifier(order.issued, order.duration)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>;
  } else {
    buyTable = "no sell orders"
  }
  return(
    <React.Fragment>
      {sellTable}
      {buyTable}
    </React.Fragment>
  );
}

export default MarketTable;