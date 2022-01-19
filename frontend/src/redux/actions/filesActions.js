import axios from 'axios'
import {toastr} from 'react-redux-toastr'

const filesActions = {

    uploadUserImage : (data)=>{
        return async (dispatch)=>{
            console.log(data)
            let response = await axios.post("http://localhost:4000/api/files/upload", data)
            console.log(response)
            dispatch({type: "GET_ALL", payload:{}})
        }
    }
}

export default filesActions