/**
 * Created by yangfan on 2017/2/9.
 * 讲所有的reducer组合到一起
 */
import {combineReducers} from "redux";
import homePage from "./homePage";

const allReducer=combineReducers({homePage});

export default allReducer;