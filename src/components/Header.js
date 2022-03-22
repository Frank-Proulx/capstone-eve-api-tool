import React, { useEffect, useState } from 'react';

function Header() {
  let statusInfo;
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch(`https://esi.evetech.net/latest/status/?datasource=tranquility
    `)
  .then(response => response.json())
  .then(
    (jsonifiedResponse) => {
      setStatus(jsonifiedResponse)
    })
    .catch((error) => {
      setStatus(error)
    });
  }, [])

  const headerStyle = {
    fontSize: "60px",
    margin: "0",
    textAlign: "center",
    color: "white",
    paddingTop: "20px"
  }

  const statusStyle = {
    textAlign: "center",
    fontSize: "20px",
    color: "lightgreen"
  }

  status ? statusInfo = <p style={statusStyle}>Current players: {status.players}</p> : statusInfo = "Loading..."

  return (
    <React.Fragment>
      <h1 style={headerStyle}>Eve Online Interface</h1>
      {statusInfo}
    </React.Fragment>
  );
}

export default Header;
