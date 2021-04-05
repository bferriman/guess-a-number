import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
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

// // for use with ScrollView list implementation
// const renderListItem = (value, numOfRound) => {
//   return (
//     <View key={value} style={styles.listItem}>
//       <BodyText>rd {numOfRound}</BodyText>
//       <BodyText>{value}</BodyText>
//     </View>
//   );
// }

// for use with FlatList list implementation
const renderListItem = (numRounds, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>rd {numRounds - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
}


const GameScreen = props => {
  const initialGuess = getRandomBetween(0, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(Dimensions.get("window").width);
  const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get("window").height);
  const minBound = useRef(0);
  const maxBound = useRef(100);

  const { userChoice, onGameOver } = props;

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

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver, pastGuesses]);

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
    setPastGuesses(curPastGuesses => [nextGuess, ...curPastGuesses]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={{...styles.controls, width: availableDeviceWidth > 350 ? "72%" : "80%"}}>
          <MainButton onPress={guessHandler.bind(this, "lower")}>
            <Ionicons name="caret-down" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={guessHandler.bind(this, "higher")}>
            <Ionicons name="caret-up" size={24} color="white" />
          </MainButton>
        </View>
        <View style={{...styles.listContainer, width: availableDeviceWidth > 350 ? "72%" : "80%"}}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}
          </ScrollView> */}
          <FlatList 
            keyExtractor={(item) => item.toString()}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={{...styles.buttonContainer, marginTop: availableDeviceHeight > 600 ? 20 : 5}}>
        <MainButton onPress={guessHandler.bind(this, "lower")}>
          <Ionicons name="caret-down" size={24} color="white" />
        </MainButton>
        <MainButton onPress={guessHandler.bind(this, "higher")}>
          <Ionicons name="caret-up" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={{...styles.listContainer, width: availableDeviceWidth > 350 ? "72%" : "80%"}}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}
        </ScrollView> */}
        <FlatList 
          keyExtractor={(item) => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    width: 400,
    maxWidth: "90%"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listContainer: {
    flex: 1
    // width: "80%"
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end"
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "72%"
    width: "100%"
  }
});

export default GameScreen;