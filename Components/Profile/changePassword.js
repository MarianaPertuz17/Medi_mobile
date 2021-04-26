import React, { useState, useEffect } from "react";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  BottomNavigation,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

function ChangePassword() {
  const userInfo = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [repeatNewPw, setRepeatNewPw] = useState("");

  console.log(userInfo, "user informatin");

  const handleChange = async () => {
    const updateUser = {
      currentPw,
      newPw,
      repeatNewPw,
    };

    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userInfo.userInfo.token,
        },
      };

      const request = await axios.post(
        "http://3.14.73.151/userapps/changepw",
        updateUser,
        config
      );

      alert("Se ha actualizado su contraseña");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Actions.pop("profile")}>
          <ImageBackground
            source={require("./leftarrow.png")}
            style={{
              width: 25,
              height: 25,
              overflow: "hidden",
            }}
          ></ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleChange}>
          <ImageBackground
            source={require("./tick.png")}
            style={{
              width: 25,
              height: 25,
              overflow: "hidden",
            }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>

      <Text style={styles.changePasswordText}>
        Digite a continuación la contraseña actual de la cuenta y la nueva
        contraseña.
      </Text>

      <TextInput
        id="displayName"
        name="displayName"
        autoFocus
        placeholder="Contraseña actual"
        style={styles.textInput}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(e) => setCurrentPw(e)}
      ></TextInput>

      <TextInput
        id="displayName"
        name="displayName"
        autoFocus
        placeholder="Contraseña nueva"
        style={styles.textInput}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(e) => setNewPw(e)}
      ></TextInput>

      <TextInput
        id="displayName"
        name="displayName"
        autoFocus
        placeholder="Repetir contraseña nueva"
        style={styles.textInput}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(e) => setRepeatNewPw(e)}
      ></TextInput>
    </View>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textInput: {
    height: 40,
    width: 370,
    marginLeft: 20,
    borderColor: "lightgray",
    borderWidth: 1.5,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: "whitesmoke",
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 30,
  },

  changePasswordText: {
    fontFamily: "Roboto_400Regular",
    width: 370,
    fontSize: 14,
    marginBottom: 30,
    marginLeft: 20,
    color: "black",
  },
});
