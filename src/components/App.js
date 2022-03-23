import React from 'react';
import Header from './Header';
import MarketControl from './MarketControl';
import spaceship from './../img/Eve-background.jpeg';
import dead from './../img/titan-dead.jpg';
import green from './../img/titan-green.jpg';
import charon from './../img/charon.jpg';
import punisher from './../img/punisher.png';

function App() {

  let randomBack = Math.floor(Math.random() * 5);

  switch (randomBack) {
    case 0:
      randomBack = spaceship;
      break;
    case 1:
      randomBack = dead;
      break;
    case 2:
      randomBack = green;
      break;
    case 3:
      randomBack = charon;
      break;
    case 4:
      randomBack = punisher;
      break;
    default:
      console.log("there was an error with the background image")
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
