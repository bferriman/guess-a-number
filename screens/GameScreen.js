import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const getRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min - 1) + min + 1);
  if (rndNum === exclude) {
    return getRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(getRandomBetween(0, 100, props.userChoice));
  const [numGuesses, setNumGuesses] = useState(1);
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
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={guessHandler.bind(this, "lower")}>LOWER</MainButton>
        <MainButton onPress={guessHandler.bind(this, "higher")}>HIGHER</MainButton>
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
    width: 400,
    maxWidth: "90%"
  }
});

export default GameScreen;