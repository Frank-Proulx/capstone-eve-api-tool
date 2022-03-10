import React from 'react';

function Header() {

  const headerStyle = {
    fontSize: "50px",
    margin: "22px"
  }

  return (
    <React.Fragment>
      <h1 style={headerStyle}>Eve Online Interface</h1>
    </React.Fragment>
  );
}

export default Header;
