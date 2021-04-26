import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Input, InputLabel } from "@material-ui/core";
import Routes from "./Routes/Routes.js";
import LottieView from "lottie-react-native";
import UserContext from "./Components/Context/context";
import Axios from "axios";
import { createStore, applyMiddleware } from "redux";
import allReducer from "./Components/reducers";
import login from "./Components/SignIn/index";
import GetUser from "./Components/SignIn/GetUser";
import { Provider } from "react-redux";
import { config } from "./firebase";
import firebase from "firebase";

//STORE
const store = createStore(
  allReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
