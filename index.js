import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, InputLabel } from "@material-ui/core";
import Routes from "./Routes/Routes.js";
import LottieView from "lottie-react-native";
import UserContext from "./Components/Context/context";
import Axios from "axios";

const functions = require("firebase-functions");

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Routes />
    </UserContext.Provider>
  );
}

export default App;
