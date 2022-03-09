import React from 'react';

function Route(props) {

  const ulStyle = {
    maxWidth: "fit-content",
    margin: "0 auto"
  };

  let routeDisplay = "";

  ((props.isLoaded > 0) && (props.isLoaded === props.currentRoute.length)) ? routeDisplay =
  props.currentRoute.map((system, index) => 
    <li key={index}>{props.systemArray.filter(detail => detail.system_id === system)[0]["name"]} | Security Status: {(props.systemArray.filter(detail => detail.system_id === system)[0]["security_status"]).toFixed(2)}</li>
  )
  : routeDisplay = "Enter your route above"

  return (
    <React.Fragment>
      <h1>Route Display</h1>
      <ul style={ulStyle}>
        {routeDisplay}
      </ul>
    </React.Fragment>
  );
}

export default Route;

// Make this into a map of <System /> components that hold all the info for each system