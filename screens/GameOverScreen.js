import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <ScrollView>
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
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed <Text style={styles.highlight}>{props.numRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.answer}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Dimensions.get("window").width * 0.7 / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30
  },
  image: {
    width: "100%",
    height: "100%"
  },
  resultContainer: {
    marginHorizontal: 50,
    marginVertical: Dimensions.get("window").height / 60
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 1000 ? 16 : 20
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;