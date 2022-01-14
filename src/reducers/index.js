import {combineReducers} from "redux";
import photoCardReducer from "./photoCardReducer";




export default combineReducers({
 photoCards: photoCardReducer
});