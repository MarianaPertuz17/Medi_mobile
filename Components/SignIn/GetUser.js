import React, { useState } from "react";
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default async function submit(email, password, dispatch) {
  console.log("im in yes");

  const loginUser = { email: email.toLowerCase().trim(), password };

  const setUser = (payload) => ({ type: "LOGIN_USER", payload });

  console.log(loginUser);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginRes = await axios.post(
      "http://3.14.73.151/userapps/login",
      loginUser,
      config
    );

    console.log(loginRes.data, "elto");
    if (loginRes.data.token) {
      dispatch(setUser(loginRes.data.token));
      Actions.replace("main", { token: loginRes.data.token });
    } else {
      alert("no funcionó");
    }
  } catch (err) {
    alert(err.response.data);
  }
}
