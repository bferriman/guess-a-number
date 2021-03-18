import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

import Colors from "../constants/colors";

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputHandler = inputText => {
    //set value, using reg expression to replace any non-number characters with an empty string
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Input", "Please enter a number from 1-99.", [{text: "Okay", style: "destructive", onPress: resetHandler}]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmOutput}>
        <Text>Your Number:</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View style={styles.button}><Button title="Start" onPress={() => props.onStartGame(selectedNumber)} color={Colors.primary} /></View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input 
            style={styles.input} 
            blurOnSubmit 
            autoCapitalize="none" 
            autoCorrect={false} 
            keyboardType="number-pad" 
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title="Reset" onPress={resetHandler} color={Colors.accent} /></View>
            <View style={styles.button}><Button title="Confirm" onPress={confirmHandler} color={Colors.primary} /></View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  confirmOutput: {
    alignItems: "center",
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: 96
  },
  input: {
    width: 50,
    textAlign: "center"
  }
});

export default StartGameScreen;