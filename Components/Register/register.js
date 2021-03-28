import React, { useState, useEffect, cloneElement } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Jost_100Thin,
  Jost_200ExtraLight,
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_900Black,
  Jost_100Thin_Italic,
  Jost_200ExtraLight_Italic,
  Jost_300Light_Italic,
  Jost_400Regular_Italic,
  Jost_500Medium_Italic,
  Jost_600SemiBold_Italic,
  Jost_700Bold_Italic,
  Jost_800ExtraBold_Italic,
  Jost_900Black_Italic,
} from "@expo-google-fonts/jost";
import { AppLoading } from "expo";
import { set } from "mongoose";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [lastName, setLastName] = useState("");
  const [docuId, setDocuId] = useState("");
  const [temperature, setTemperature] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [pressure, setPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [temperatureArray, setTemperatureArray] = useState([]);
  const [sugarLevelArray, setSugarLevelArray] = useState([]);
  const [pressureArray, setPressureArray] = useState([]);
  const [WeightArray, setWeightArray] = useState([]);
  const [message, setMessage] = useState("");
  const [colorMessage, setColorMessage] = useState("red");

  useEffect(() => {
    if (passwordCheck.length === 0) {
      setMessage("");
    } else if (password === passwordCheck) {
      setMessage("Las contraseñas coinciden");
      setColorMessage("green");
    } else {
      setMessage("Las contraseñas no coinciden");
      setColorMessage("red");
    }
  }, [passwordCheck, password]);

  const sendInfo = async (e) => {
    e.preventDefault();
    console.log("entre marita");

    const newUser = {
      displayName,
      docuId,
      lastName,
      email,
      password,
      passwordCheck,
      temperature,
      sugarLevel,
      pressure,
      weight,
    };

    console.log(newUser);
    try {
      const request = await axios.post(
        "http://192.168.1.29:3001/userapps/register",
        newUser
      );
      console.log(request);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setPressureArray(pressure);
    setWeightArray(weight);
    setTemperatureArray(temperature);
    setSugarLevelArray(sugarLevel);
  }, [pressure, weight, temperature, sugarLevel]);

  return (
    <View style={styles.container}>
      <ScrollView scrollsToTop={true}>
        <Text
          style={{
            fontFamily: "Jost_600SemiBold",
            fontSize: 24,
            alignContent: "center",
            alignSelf: "center",
            marginBottom: 30,
            marginTop: 60,
            color: "#0a4c66",
          }}
        >
          REGISTRO
        </Text>

        <Text
          style={{
            fontFamily: "Jost_300Light",
            fontSize: 14,
            marginBottom: 30,
            width: 370,
            textAlign: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          ¡Estás muy cerca de comenzar a utilizar nuestra aplicación! Pero
          primero necesitamos los siguientes datos:
        </Text>

        <View
          style={{
            paddingTop: 15,
            paddingBottom: 20,
            width: 370,
            borderRadius: 15,
            alignSelf: "center",
            backgroundColor: "whitesmoke",
            borderColor: "lightgray",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Jost_600SemiBold",
              fontSize: 18,
              marginBottom: 35,
              marginLeft: 40,
              color: "#0a4c66",
            }}
          >
            Datos de usuario:
          </Text>
          <Text style={styles.textLabel}>Nombre</Text>
          <TextInput
            id="nombre"
            name="nombre"
            autoFocus
            style={styles.textInput}
            value={displayName}
            onChangeText={(e) => setDisplayName(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Apellidos</Text>
          <TextInput
            id="apellidos"
            name="apellidos"
            value={lastName}
            autoFocus
            style={styles.textInput}
            onChangeText={(e) => setLastName(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Documento de Identidad</Text>
          <TextInput
            id="docu"
            name="docu"
            autoFocus
            value={docuId}
            style={styles.textInput}
            onChangeText={(e) => setDocuId(e)}
          ></TextInput>

          <Text htmlFor="email" style={styles.textLabel}>
            Correo Electrónico
          </Text>
          <TextInput
            id="email"
            name="email"
            autoFocus
            value={email}
            style={styles.textInput}
            onChangeText={(e) => setEmail(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Contraseña</Text>
          <TextInput
            name="password"
            type="password"
            id="password"
            value={password}
            textContentType="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(e) => setPassword(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Confirme Contraseña</Text>
          <TextInput
            name="password"
            type="password"
            id="password"
            value={passwordCheck}
            textContentType="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(e) => setPasswordCheck(e)}
          ></TextInput>
          <Text
            style={{
              fontFamily: "Jost_300Light",
              fontSize: 14,
              marginBottom: 30,
              width: 290,
              marginLeft: 40,
              color: colorMessage,
            }}
          >
            {message}
          </Text>
        </View>

        <View
          style={{
            marginTop: 40,
            paddingTop: 15,
            paddingBottom: 20,
            width: 370,
            borderRadius: 15,
            alignSelf: "center",
            backgroundColor: "whitesmoke",
            borderColor: "lightgray",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Jost_600SemiBold",
              fontSize: 18,
              marginBottom: 35,
              marginLeft: 40,
              color: "#0a4c66",
            }}
          >
            Datos de salud actuales:
          </Text>
          <Text style={styles.textLabel}>
            Temperatura (en grados centígrados)
          </Text>
          <TextInput
            id="temperature"
            name="temperature"
            autoFocus
            style={styles.textInput}
            value={temperature}
            onChangeText={(e) => setTemperature(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Nivel de azúcar</Text>
          <TextInput
            id="sugarLevel"
            name="sugarLevel"
            value={sugarLevel}
            autoFocus
            style={styles.textInput}
            onChangeText={(e) => setSugarLevel(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Presión arterial</Text>
          <TextInput
            id="pressure"
            name="pressure"
            autoFocus
            value={pressure}
            style={styles.textInput}
            onChangeText={(e) => setPressure(e)}
          ></TextInput>

          <Text style={styles.textLabel}>Peso</Text>
          <TextInput
            id="weight"
            name="weight"
            autoFocus
            value={weight}
            style={styles.textInput}
            onChangeText={(e) => setWeight(e)}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.button2} onPress={sendInfo}>
          <Text style={styles.register3}>Registrarse</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },

  textLabel: {
    marginLeft: 40,
    fontFamily: "Jost_400Regular",
    fontSize: 15,
  },

  textInput: {
    height: 30,
    width: 290,
    marginLeft: 40,
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
    alignSelf: "flex-end",
    width: 420,
    marginTop: 30,
    alignSelf: "center",
  },
});
