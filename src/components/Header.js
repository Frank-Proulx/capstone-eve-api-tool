import React from 'react';

function Header() {

  const headerStyle = {
    fontSize: "60px",
    margin: "0 0 10px 0",
    textAlign: "center",
    color: "white",
    paddingTop: "20px"
  }

  return (
    <React.Fragment>
      <h1 style={headerStyle}>Eve Online Interface</h1>
    </React.Fragment>
  );
}

export default Header;
