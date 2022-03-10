import React from 'react';

function MarketTable(props) {
  let sellTable = '';
  let buyTable = '';
  // let iconUrl;
  // let itemName;
  let now = new Date();

  const tableDiv = {
    width: "60vw",
    height: "26vh",
    margin: "0 auto",
    overflow: "scroll",
    border: "1px solid white",
    textAlign: "left",
    tableLayout: "auto",
  }

  const tableHeaderDiv = {
    width: "60vw",
    height: "6vh",
    margin: "0 auto",
    border: "1px solid white",
    textAlign: "center",
    padding: "0 0 4px 0",
    backgroundColor: "#c4c4c4",
    color: "#151515",
    marginTop: "2vh"
  }

  function filterLocation(structureArray, locationID) {
    let result = structureArray.filter(structure => structure.station_id === locationID);
    let resultHolder = (result[0] || {"name": "Player Owned Citadel"});
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
          <h2>Sell Orders</h2>
        </div>
        <div style={tableDiv}>
          <table>
            <thead>
              <tr>
                <th onClick={() => props.sortSell("volume_remain")}>Quantity</th>
                <th onClick={() => props.sortSell("price")}>Price</th>
                <th onClick={() => props.sortSell("station")}>Location</th>
                <th onClick={() => props.sortSell("issued")}>Expires In</th>
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
          <h2>Buy Orders</h2>
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
                <th onClick={() => props.sortBuy("issued")}>Expires In</th>
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

  // if (props.sellOrders.length > 0) {
  //   iconUrl = <img src={`https://images.evetech.net/types/${props.sellOrders[0]["type_id"]}/icon`} />
  //   itemName = <h2>{props.sellOrders[0]["name"]}</h2>
  // } else if (props.buyOrders.length > 0) {
  //   iconUrl = <img src={`https://images.evetech.net/types/${props.buyOrders[0]["type_id"]}/icon`} width="10" />
  //   itemName = <h2>{props.buyOrders[0]["name"]}</h2>
  // } else {
  //   iconUrl = '';
  //   itemName = '';
  // }

  return(
    <React.Fragment>
      {/* {itemName}
      {iconUrl} */}
      {sellTable}
      {buyTable}
    </React.Fragment>
  );
}

export default MarketTable;