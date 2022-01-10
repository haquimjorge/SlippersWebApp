import {combineReducers} from "redux"
import shoeReducer from "./shoeReducer"
import userReducer from "./userReducer"

const mainReducer = combineReducers({
    shoeReducer,
    userReducer
})

export default mainReducer