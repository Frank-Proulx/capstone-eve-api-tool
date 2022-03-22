import React from 'react';
import Header from './Header';
import MarketControl from './MarketControl';
import spaceship from './../img/Eve-background.jpeg';
import dead from './../img/titan-dead.jpg';
import green from './../img/titan-green.jpg'

function App() {

  let randomBack = Math.floor(Math.random() * 3);

  if (randomBack === 0) {
    randomBack = spaceship;
  } else if (randomBack === 1) {
    randomBack = dead;
  } else {
    randomBack = green;
  }

  const backgroundImage = {
    backgroundImage: `url(${randomBack})`,
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
