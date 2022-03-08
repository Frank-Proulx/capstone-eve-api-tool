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
    textAlign: "left",
    tableLayout: "auto"
  }

  const tableHeaderDiv = {
    width: "60vw",
    height: "6vh",
    margin: "0 auto",
    border: "1px solid black",
    textAlign: "center",
    padding: "0 0 4px 0",
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
      <React.Fragment>
        <div style={tableHeaderDiv}>
          <h2>I Should be here</h2>
        </div>
        <div style={tableDiv}>
          <table>
            <thead>
              <tr>
                <th onClick={() => props.sortSell("volume_remain")}>Quantity</th>
                <th onClick={() => props.sortSell("price")}>Price</th>
                <th onClick={() => props.sortSell("station")}>Location</th>
                <th>Expires In</th>
                {/* <th>Jumps away</th> */}
              </tr>
            </thead>
            <tbody>
              {props.sellOrders.map((order, index) => 
                <tr key={index}>
                  <td>{order.volume_remain}</td>
                  <td>{order.price}</td>
                  <td>{order.station || filterLocation(props.structureArray, order.location_id)}</td>
                  <td>{timeifier(order.issued, order.duration)}</td>
                  {/* <td>{props.getTravelRoute(props.startSystem, order.system_id)}</td> */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </React.Fragment>
  } else {
    sellTable = ""
  }
  if (props.buyOrders.length > 0) {
    buyTable = 
      <React.Fragment>
        <div style={tableHeaderDiv}>
          <h2>I Should be here</h2>
        </div>
        <div style={tableDiv}>
          <table>
            <thead>
              <tr>
                <th onClick={() => props.sortBuy("volume_remain")}>Quantity</th>
                <th onClick={() => props.sortBuy("price")}>Price</th>
                <th onClick={() => props.sortBuy("station")}>Location</th>
                <th onClick={() => props.sortBuy("range")}>Range</th>
                <th onClick={() => props.sortBuy("min_volume")}>Min Volume</th>
                <th>Expires In</th>
              </tr>
            </thead>
            <tbody>
              {props.buyOrders.map((order, index) => 
                <tr key={index}>
                  <td>{order.volume_remain}</td>
                  <td>{order.price}</td>
                  <td>{order.station || filterLocation(props.structureArray, order.location_id)}</td>
                  <td>{order.range}</td>
                  <td>{order.min_volume}</td>
                  {/* <td>{order.expires_in || timeifier(order.issued, order.duration)}</td> */}
                  <td>{timeifier(order.issued, order.duration)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </React.Fragment>          
  } else {
    buyTable = ""
  }
  return(
    <React.Fragment>
      {sellTable}
      {buyTable}
    </React.Fragment>
  );
}

export default MarketTable;