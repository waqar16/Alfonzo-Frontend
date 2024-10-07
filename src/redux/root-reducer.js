import { combineReducers } from "@reduxjs/toolkit";
import lawyerReducer from "./reducers/lawyer-reducer";
import documentReducer from "./reducers/document-reducer";
import themeReducer from "./reducers/theme-reducer";
import languageReducer from "./reducers/language-reducer";
export default combineReducers({
  lawyer: lawyerReducer,
  document: documentReducer,
  theme: themeReducer,
  language: languageReducer,
});
