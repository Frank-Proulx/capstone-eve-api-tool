import React from 'react';

function Header() {

  const headerStyle = {
    fontSize: "50px",
    margin: "0 0 22px 0",
    textAlign: "center",
    color: "white"
  }

  return (
    <React.Fragment>
      <h1 style={headerStyle}>Eve Online Interface</h1>
    </React.Fragment>
  );
}

export default Header;
