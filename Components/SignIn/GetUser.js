import React, { useState } from "react";
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default async function submit(email, password, dispatch) {
  console.log("im in yes");

  const loginUser = { email, password };

  const setUser = (payload) => ({ type: "LOGIN_USER", payload });

  console.log(loginUser);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //faldayblusablanca

    const loginRes = await axios.post(
      "http://192.168.1.29:3001/userapps/login",
      loginUser,
      config
    );

    // setUserData({
    //   token: loginRes.data.token,
    //   user: loginRes.data.user,
    // });

    if (loginRes.data.token) {
      dispatch(setUser(loginRes.data.token));
      Actions.replace("main", { token: loginRes.data.token });
    } else {
      alert("no funcionó");
    }
  } catch (err) {
    alert(err);
  }
}
