import {combineReducers} from "redux"
import shoeReducer from "./shoeReducer"
import userReducer from "./userReducer"
import {reducer as toastrReducer} from 'react-redux-toastr'

const mainReducer = combineReducers({
    shoeReducer,
    userReducer,
    toastr: toastrReducer
})

export default mainReducer