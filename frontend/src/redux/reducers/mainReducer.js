import {combineReducers} from "redux"
import shoeReducer from "./shoeReducer"

const mainReducer = combineReducers({
    shoeReducer,
})

export default mainReducer