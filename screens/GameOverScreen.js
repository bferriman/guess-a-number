import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    }

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    }

  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>GAME OVER</TitleText>
        <View style={{...styles.imageContainer, ...{
          width: availableDeviceWidth * 0.7,
          height: availableDeviceWidth * 0.7,
          borderRadius: availableDeviceWidth * 0.7 / 2,
          marginVertical: availableDeviceHeight / 30          
        }}}>
          <Image 
            source={require("../assets/images/success.png")} 
            // source={{uri: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}}
            style={styles.image}
            resizeMode="cover"
            // fadeDuration={500}  //specify num of ms over which image fades in on first load
          />
        </View>
        <View style={{...styles.resultContainer, marginVertical: availableDeviceHeight / 60}}>
          <BodyText style={{...styles.resultText, fontSize: availableDeviceHeight < 1000 ? 16 : 20}}>
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
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  resultContainer: {
    marginHorizontal: 50
  },
  resultText: {
    textAlign: "center"
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;