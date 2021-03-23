import React, { useState, useRef, useEffect, componentDidUpdate } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const getRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return getRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(getRandomBetween(1, 100, props.userChoice));
  const [numGuesses, setNumGuesses] = useState(0);
  const minBound = useRef(1);
  const maxBound = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(numGuesses);
    }
  }, [currentGuess, userChoice, onGameOver, numGuesses]);

  const guessHandler = direction => {
    if ((direction === "lower" && currentGuess < props.userChoice) ||
        (direction === "higher" && currentGuess > props.userChoice)) {
      Alert.alert("WOAH THERE!", "Let's play fair now...", [{text: "FINE", style: "cancel"}]);
      return;
    }
    if (direction === "lower") {
      maxBound.current = currentGuess;
    } else {
      minBound.current = currentGuess;
    }
    const nextGuess = getRandomBetween(minBound.current, maxBound.current, currentGuess);
    setCurrentGuess(nextGuess);
    setNumGuesses(curNumGuesses => curNumGuesses + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={guessHandler.bind(this, "lower")} />
        <Button title="HIGHER" onPress={guessHandler.bind(this, "higher")} />
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;