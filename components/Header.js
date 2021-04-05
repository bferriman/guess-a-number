import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import TitleText from "./TitleText";

import Colors from "../constants/colors";

const Header = props => {
  return (
    <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  headerTitle: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: 18
  }
});

export default Header;