import React from "react";
import Game from "./Game";
import Alert from "./components/Alert";
import AlertProvider from "./providers/AlertProvider";
import Instructions from "./components/Instructions";

function App() {
  return (
    <AlertProvider>
      <Instructions />
      <h1>Finger Spordle</h1>
      <Alert />
      <Game />
    </AlertProvider>
  );
}

export default App;
