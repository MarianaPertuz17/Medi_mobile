import React from "react";

//REDUCER

const initialState = {
  currentUser: {},
  loading: true,
  token: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
