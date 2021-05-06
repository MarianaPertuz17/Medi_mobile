import React, { useState, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { useSelector } from "react-redux";
import axios from "axios";
import CheckBox from "./checkbox";

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

import { ScrollView } from "react-native-gesture-handler";
import Symptoms from "./symptoms";

function State(...props) {
  const [weight, setWeight] = useState("");
  const [systolicPressure, setSystolicPressure] = useState("");
  const [diastolicPressure, setDiastolicPressure] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [heartFreq, setHeartFreq] = useState("");
  const [oxygenSat, setOxygenSat] = useState("");
  const userInfo = useSelector((state) => state);
  const [userData, setUserData] = useState(null);
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  const [click5, setClick5] = useState(false);
  const [badCondition, setBadCondition] = useState(false);
  const [conditions, setConditions] = useState();
  const [symptoms, setSymptoms] = useState();

  console.log(userInfo.symptomInfo.condition, "condicion");
  console.log(userInfo.userInfo.token, "token que sale");
  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userInfo.userInfo.token,
        },
      };
      const res = await axios.get("http://192.168.1.29:3001/userapps/", config);
      setUserData(res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    if (userInfo.conditionInfo.condition !== null) {
      setConditions(userInfo.conditionInfo.condition);
    }
  }, [userInfo.conditionInfo.condition]);

  const sendState = async () => {
    const updateUser = {
      heartFreq,
      sugarLevel,
      systolicPressure,
      diastolicPressure,
      conditions: conditions,
      symptoms: userInfo.symptomInfo.condition,
      weight,
      oxygenSat,
      userID: userData.user._id,
      user: userData.user,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const request = await axios.post(
        "http://192.168.1.29:3001/userapps/updatestate",
        updateUser,
        config
      );

      alert("Se ha actualizado su estado");
    } catch (err) {
      alert(err.response.data);
    }
  };

  useEffect(() => {}, [
    weight,
    systolicPressure,
    diastolicPressure,
    sugarLevel,
    heartFreq,
    conditions,
    symptoms,
  ]);

  return (
    <View styles={styles.container}>
      <ScrollView scrollsToTop={true} keyboardShouldPersistTaps="handled">
        <Text
          style={{
            color: "#0a4c66",
            fontSize: 30,
            fontFamily: "Roboto_700Bold",
            borderBottomColor: "lightgray",
            borderBottomWidth: 1.3,
            marginTop: 50,
            padding: 10,
            paddingLeft: 20,
          }}
        >
          Mi Estado
        </Text>

        <Text
          style={{
            fontFamily: "Roboto_400Regular",
            fontSize: 15,
            marginTop: 20,
            marginLeft: 20,
            width: 380,
            color: "gray",
          }}
        >
          Ayúdanos a mejorar tu experiencia, actualizando los siguientes datos.
        </Text>

        <TouchableOpacity
          style={styles.dropDownBox}
          onPress={() => setClick5(!click5)}
        >
          <View style={styles.header}>
            <Text style={styles.title}>PRESIÓN</Text>
            {click5 ? (
              <ImageBackground
                source={require("./down-arrow.png")}
                style={styles.arrowUp}
              ></ImageBackground>
            ) : (
              <ImageBackground
                source={require("./down-arrow.png")}
                style={styles.arrowDown}
              ></ImageBackground>
            )}
          </View>

          <View>
            {click5 ? (
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 15,
                    marginTop: 20,
                    width: 363,
                    borderWidth: 0.7,
                    borderColor: "gray",
                    color: "gray",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  PRO TIP! Para la toma de la presión, se debe seleccionar si se
                  tomó en reposo o bajo alguna condición (ejercicio, bebidas
                  energéticas y cualquier condición que impida que el paciente
                  esté relajado). En caso de elegir bajo condición, escribir el
                  nombre de la condición
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.normalText3}>Presión Sistólica:</Text>
                  <TextInput
                    id="pression"
                    name="pression"
                    autoFocus
                    style={styles.textInput}
                    onChangeText={(e) => setSystolicPressure(e)}
                  ></TextInput>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 15,
                      marginLeft: 10,
                      color: "gray",
                    }}
                  >
                    mmHg
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.normalText3}>Presión Diastólica:</Text>
                  <TextInput
                    id="pression"
                    name="pression"
                    autoFocus
                    style={styles.textInput}
                    onChangeText={(e) => setDiastolicPressure(e)}
                  ></TextInput>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 15,
                      marginLeft: 10,
                      color: "gray",
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                  >
                    mmHg
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.myButton2}
                    onPress={(e) => setConditions("en reposo")}
                  >
                    <Text style={styles.textButton2}>En reposo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.myButton3}
                    onPress={() => setBadCondition(!badCondition)}
                  >
                    <Text style={styles.textButton2}>
                      Bajo alguna condición
                    </Text>
                  </TouchableOpacity>
                </View>
                {badCondition ? (
                  <View>
                    <CheckBox />
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dropDownBox}
          onPress={() => setClick(!click)}
        >
          <View style={styles.header}>
            <Text style={styles.title}>PESO</Text>
            {click ? (
              <ImageBackground
                source={require("./down-arrow.png")}
                style={styles.arrowUp}
              ></ImageBackground>
            ) : (
              <ImageBackground
                source={require("./down-arrow.png")}
                style={styles.arrowDown}
              ></ImageBackground>
            )}
          </View>
          <View>
            {click ? (
              <View style={styles.insideDropDown}>
                <TextInput
                  id="peso"
                  name="peso"
                  autoFocus
                  style={styles.textInput}
                  onChangeText={(e) => setWeight(e)}
                ></TextInput>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 15,
                    marginLeft: 10,
                    color: "gray",
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  kg
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dropDownBox}
          onPress={() => setClick3(!click3)}
        >
          <View style={styles.header}>
            <Text style={styles.title}>FRECUENCIA CARDÍACA</Text>
            {click3 ? (
              <ImageBackground
                source={require("./down-arrow.png")}
                style={styles.arrowUp}
              ></ImageBackground>
            ) : (
              <ImageBackground
                source={require("./down-arrow.png")}
                style={styles.arrowDown}
              ></ImageBackground>
            )}
          </View>

          <View>
            {click3 ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  id="heart_freq"
                  name="heart_freq"
                  autoFocus
                  style={styles.textInput}
                  onChangeText={(e) => setHeartFreq(e)}
                ></TextInput>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 15,
                    marginLeft: 10,
                    color: "gray",
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  lat/min
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        <Text style={styles.normalText2}>SÍNTOMAS</Text>
        <Symptoms />

        <TouchableOpacity style={styles.myButton} onPress={sendState}>
          <Text style={styles.textButton}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default State;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },

  button3: {
    padding: 10,
    alignSelf: "flex-end",
    width: 380,
    height: 70,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1.3,
  },

  arrowUp: {
    width: 20,
    height: 27,
    marginRight: 5,
    transform: [{ rotate: "180deg" }],
  },

  arrowDown: {
    width: 20,
    height: 27,
    marginRight: 5,
  },

  text: {
    color: "#6a9fb4",
    fontFamily: "Jost_400Regular",
    fontSize: 18,
  },

  normalText2: {
    marginBottom: 15,
    marginTop: 18,
    color: "#0a4c66",
    marginLeft: 20,
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
  },

  normalText3: {
    marginBottom: 15,
    marginTop: 30,
    color: "#0a4c66",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    fontWeight: "bold",
  },

  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "#0a4c66",
  },

  textInput: {
    width: 90,
    borderColor: "lightgray",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 10,
    fontFamily: "Jost_400Regular",
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },

  icon: {
    width: 70,
    height: 70,

    overflow: "hidden",
  },

  iconCircle: {
    width: 20,
    height: 20,
    marginRight: 5,
    overflow: "hidden",
  },

  iconText: {
    fontFamily: "Roboto_400Regular",
    color: "gray",
    fontSize: 12,
    width: 70,
    textAlign: "center",
    marginBottom: 5,
  },

  touchable: {
    marginRight: 15,
    width: 70,
  },

  myButton: {
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: "lightgray",
    borderRadius: 20,
    width: 140,
    padding: 5,
    marginBottom: 20,
  },

  textButton: {
    color: "#0a4c66",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
    alignSelf: "center",
  },

  myButton2: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#3cb043",
    borderRadius: 10,
    width: 170,
    padding: 5,
    marginRight: 10,
    height: 50,
    marginBottom: 20,
  },

  myButton3: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#b90e0a",
    borderRadius: 10,
    width: 170,
    padding: 5,
    height: 50,
    marginBottom: 20,
  },

  textButton2: {
    color: "white",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  dropDownBox: {
    width: 380,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginLeft: 15,
    marginTop: 20,
    padding: 8,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    overflow: "scroll",
  },

  viewContainer: {
    width: 380,
    height: 50,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  insideDropDown: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },

  checkIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,
    overflow: "hidden",
    alignSelf: "center",
  },
});
