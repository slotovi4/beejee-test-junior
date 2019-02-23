import { combineReducers } from "redux";
import mainPageReducer from "./mainPageReducer";
import createTaskFormReducer from "./createTaskFormReducer";
import headerReducer from "./headerReducer";

export default combineReducers({
  mainPage: mainPageReducer,
  createTask: createTaskFormReducer,
  login: headerReducer
});
