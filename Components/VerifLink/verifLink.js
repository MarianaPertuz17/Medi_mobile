import React, { useState, useEffect, cloneElement } from "react";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

function VerifLink() {
  const [email, setEmail] = useState("");

  const sendLink = async (e) => {
    e.preventDefault();
    console.log("entre marita");

    const newUser = {
      email,
      newPassword: "defaultPass123",
    };

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const request = await axios.post(
        "http://3.14.73.151/userapps/newLink",
        newUser,
        config
      );
      console.log(request);
      Actions.push("linkSent");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Actions.pop("signin")}>
          <ImageBackground
            source={require("./leftarrow.png")}
            style={{
              width: 25,
              height: 25,
              overflow: "hidden",
            }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 30 }}>
        <Text
          style={{
            fontFamily: "Jost_600SemiBold",
            fontSize: 24,
            marginBottom: 30,
            marginTop: 40,
            color: "#0a4c66",
          }}
        >
          Solicitar nuevo link
        </Text>
        <Text
          style={{
            fontFamily: "Jost_300Light",
            fontSize: 14,
            marginBottom: 30,
            width: 370,
          }}
        >
          Digite a continuación el correo electrónico al que le llegó el link
          anterior. A este correo se enviará el nuevo link.
        </Text>

        <Text style={styles.textLabel}>Correo Electrónico</Text>
        <TextInput
          id="displayName"
          name="displayName"
          autoFocus
          style={styles.textInput}
          onChangeText={(e) => setEmail(e)}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.button2} onPress={sendLink}>
        <Text style={styles.register3}>Enviar Link</Text>
      </TouchableOpacity>
    </View>
  );
}

export default VerifLink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "Jost_400Regular",
  },

  body: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    paddingLeft: 15,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  textLabel: {
    fontFamily: "Jost_400Regular",
    fontSize: 15,
  },

  textInput: {
    height: 30,
    width: 350,
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: "transparent",
    fontFamily: "Jost_400Regular",
    fontSize: 17,
    marginBottom: 30,
  },

  register: {
    fontFamily: "Jost_400Regular",
    fontSize: 14,
    marginTop: 20,
    justifyContent: "center",
  },

  register3: {
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
    padding: 0,
    color: "whitesmoke",
    alignContent: "flex-end",
    alignSelf: "center",
  },

  button2: {
    backgroundColor: "#0a4c66",
    padding: 10,
    width: 350,
    marginTop: 30,
    alignSelf: "center",
  },
});
