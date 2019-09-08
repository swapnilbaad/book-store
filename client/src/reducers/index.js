import { combineReducers } from "redux";

import bookReducer from "./bookReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  book: bookReducer,
  auth: authReducer,
  error: errorReducer
});
