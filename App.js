import React, { useState } from "react";
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

//STORE
const store = createStore(
  allReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
