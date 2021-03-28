import { combineReducers } from "redux";
import userReducer from "./userReducer";
import conditionReducer from "./conditionReducer";
import symptomReducer from "./symptomReducer";

const allReducer = combineReducers({
  userInfo: userReducer,
  conditionInfo: conditionReducer,
  symptomInfo: symptomReducer,
});

export default allReducer;
