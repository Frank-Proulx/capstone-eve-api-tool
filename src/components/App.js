import React from 'react';
import Header from './Header';
import MarketControl from './MarketControl';
import spaceship from './../img/Eve-background.jpeg'


function App() {

  const backgroundImage = {
    backgroundImage: `url(${spaceship})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
  }

  return (
    <React.Fragment>
      <div style={backgroundImage}>
        <Header />
        <MarketControl />
      </div>
    </React.Fragment>
  );
}

export default App;
