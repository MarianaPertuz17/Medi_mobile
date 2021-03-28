import React from "react";

//REDUCER

const initialState = { condition: {} };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "CONDITION_ARRAY":
      return { ...state, condition: action.payload };
    default:
      return state;
  }
}
