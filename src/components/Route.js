import React from 'react';

function Route(props) {

  let routeDisplay = "";
  
  function mapifier() {
    <ul>
      {props.currentRoute.map((system, index) => {
        (props.isLoaded) ? <li key={index}>{(props.systemArray.filter(detail => detail.system_id === system))["name"]}</li> : "Loading...";
      })}
    </ul>
  }

  return (
    <React.Fragment>
      <h1>Route Display</h1>
      {routeDisplay}
    </React.Fragment>
  );
}

export default Route;
