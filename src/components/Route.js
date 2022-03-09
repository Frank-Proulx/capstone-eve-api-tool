import React from 'react';

function Route(props) {

  let routeDisplay = "";

  props.isLoaded ? routeDisplay =
  props.currentRoute.map((system, index) => 
    <li key={index}>{props.systemArray.filter(detail => detail.system_id === system)[0]["name"]} system</li>
  )
  : routeDisplay = "Enter your route above"

  return (
    <React.Fragment>
      <h1>Route Display</h1>
      <ul>
        {routeDisplay}
      </ul>
    </React.Fragment>
  );
}

export default Route;
