import { combineReducers } from "@reduxjs/toolkit";
import lawyerReducer from "./reducers/lawyer-reducer";
import documentReducer from "./reducers/document-reducer";
export default combineReducers({
  lawyer: lawyerReducer,
  document: documentReducer,
});
