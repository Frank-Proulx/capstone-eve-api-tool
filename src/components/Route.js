import React from 'react';

function Route(props) {

  const ulStyle = {
    maxWidth: "fit-content",
    margin: "0 auto 20px auto"
  };

  const h2Style = {
    textAlign: "center",
    marginBottom: "1vh"
  }

  let routeDisplay;;
  let routeDistance;

  if (props.currentRoute.length > 0) {
    routeDistance = <h2 style={h2Style}>There are {props.currentRoute.length - 1} jumps on your journey</h2>
  }

  ((props.isLoaded > 0) && (props.isLoaded === props.currentRoute.length)) ? routeDisplay =
  props.currentRoute.map((system, index) => 
    <li key={index}>{props.systemArray.filter(detail => detail.system_id === system)[0]["name"]} | Security Status: {(props.systemArray.filter(detail => detail.system_id === system)[0]["security_status"]).toFixed(2)}</li>
  )
  : routeDisplay = ""

  return (
    <React.Fragment>
      {/* <h1>Route Display</h1> */}
      {routeDistance}
      <ul style={ulStyle}>
        {routeDisplay}
      </ul>
    </React.Fragment>
  );
}

export default Route;

// Make this into a map of <System /> components that hold all the info for each system