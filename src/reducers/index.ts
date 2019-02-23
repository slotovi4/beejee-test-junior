import { combineReducers } from "redux";
import mainPageReducer from "./mainPageReducer";
import createTaskFormReducer from "./createTaskFormReducer";

export default combineReducers({
  mainPage: mainPageReducer,
  createTask: createTaskFormReducer
});
