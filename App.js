import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numGuesses, setNumGuesses] = useState(0);

  const configNewGameHandler = () => {
    setNumGuesses(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = guesses => {
    setNumGuesses(guesses);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && numGuesses <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (numGuesses > 0) {
    content = <GameOverScreen answer={userNumber} numRounds={numGuesses} onRestart={configNewGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
