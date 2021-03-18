import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

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

  return <View></View>
};

const styles = StyleSheet.create({
  
});

export default GameScreen;