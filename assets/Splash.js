import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Actions } from "react-native-router-flux";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      Actions.signin();
    }, 3000);
  }, []);

  return (
    <View style={styles.home}>
      <Image
        source={require("../assets/mediplus.png")}
        style={{
          width: 270,
          height: 270,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
