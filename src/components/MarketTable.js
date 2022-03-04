import React from 'react';

function MarketTable(props) {
  let sellTable;
  let buyTable;
  function timifier(milliseconds) {

  }
  if (props.sellOrders.length > 0) {
    sellTable = 
      <div>
        <table>
          <tbody>
            <tr>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Range</th>
              {/* <th>Min Volume</th> */}
              <th>Expires In</th>
            </tr>
            {props.sellOrders.map((order, index) => 
              <tr key={index}>
                <td>{order.volume_remain}</td>
                <td>{order.price}</td>
                <td>{order.location_id}</td>
                <td>{order.range}</td>
                <td>{7776000000 - (Date.now() - new Date(order.issued))}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>;
  } else {
    sellTable = "no sell orders"
  }
  if (props.buyOrders.length > 0) {
    buyTable = "stuff";
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