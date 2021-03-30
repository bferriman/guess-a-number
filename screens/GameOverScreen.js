import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>GAME OVER</TitleText>
      <View style={styles.imageContainer}>
        <Image 
          source={require("../assets/images/success.png")} 
          // source={{uri: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}}
          style={styles.image}
          resizeMode="cover"
          // fadeDuration={500}  //specify num of ms over which image fades in on first load
        />
      </View>
      <BodyText>Number of rounds: {props.numRounds}</BodyText>
      <BodyText>Number was: {props.answer}</BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default GameOverScreen;