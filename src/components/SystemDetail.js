import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

function SystemDetail(props) {

  const headerStyle = {
    // fontSize: "60px",
    // margin: "0 0 10px 0",
    textAlign: "center",
    color: "white",
  }

  const systemInfoDiv = {
    maxWidth: "fit-content",
    margin: "0 auto",
    color: "white",
    paddingTop: "20px",
    fontSize: "40px"
  }

  let stations;

  (props.structureArray.length > 0) ? 
  stations = 
  props.structureArray.map((structure) => <p>{structure.name}</p>)
  : stations = <p>There are no stations in this system</p>

  return (
    <React.Fragment>
      <h1 style={headerStyle}>System Details</h1>
      <div style={systemInfoDiv}>
        <h3>System Name: {props.selectedSystem["name"]}</h3>
        {stations}
      </div>
    </React.Fragment>
  );
}

export default SystemDetail;
