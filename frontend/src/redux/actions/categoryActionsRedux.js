import axios from 'axios'
import {toastr} from 'react-redux-toastr'

const categoryActionsRedux = {

    getAllCategories : () =>{
        return async (dispatch)=>{
            let response = await axios.get("http://localhost:4000/api/allcategories")
            dispatch({type: "GET_ALL_CATEGORIES", payload:response.data.response})
        }
    },
    uploadCategory : (category)=>{
        console.log(category)
        return async (dispatch)=>{         
            let response = await axios.post("http://localhost:4000/api/category", {name:category})
            dispatch({type: "UPLOAD_CATEGORY", payload: response.data})

        }
    },
    sendDeleteSlug : (slug)=>{
        return (dispatch)=>{
            dispatch({type: "SEND_DELETE_SLUG", payload: slug})
        }
    },
    sendSubSlug : (slug)=>{
        return (dispatch)=>{
            dispatch({type: "SEND_SUB_SLUG", payload: slug})
        }
    },
    deleteCategory : (id)=>{
        return async (dispatch)=>{
            let response = await axios.delete(`http://localhost:4000/api/category/${id}`)
            dispatch({type:"DELETE_CATEGORY", payload:response.data})
        }
    },
    modifyCategory : (data)=>{
        return async (dispatch)=>{
            let response = await axios.put("http://localhost:4000/api/allcategories", data)
            if(response.data.success === false){
                toastr.error('Error!', response.data.error.codeName && response.data.error.codeName )  
            }else{
                dispatch({type:"MODIFY_CATEGORY", payload:response.data.response})
            }
        }
    },
    getSubCategoriesByParentId : (parentId)=>{
        return async (dispatch)=>{
            let response = await axios.get(`http://localhost:4000/api/subcategories/${parentId}`)
            console.log("le pegue a la db")
            dispatch({type: "GET_SUBCATEGORIES_BY_PARENT", payload: response.data})
        }
    },
    getAllSubCategories : ()=>{
        return async (dispatch)=>{
            let response = await axios.get(`http://localhost:4000/api/allsubcategories`)
            dispatch({type: "GET_ALL_SUBCATEGORIES", payload: response.data.response})
        }
    },
    modifySubCategory : (data)=>{
        return async (dispatch)=>{
            let response = await axios.put("http://localhost:4000/api/subcategories", data)
            if(response.data.success === false){
                toastr.error('Error!', response.data.error.codeName && response.data.error.codeName)  
            }else{
                dispatch({type:"MODIFY_SUBCATEGORY", payload:response.data.response})
            }
        }
    },
    deleteSubCategory : (id)=>{
        return async (dispatch)=>{
            console.log(id)
            let response = await axios.delete(`http://localhost:4000/api/allsubcategory/${id}`)
            console.log(response.data)
            dispatch({type:"DELETE_SUBCATEGORY", payload:response.data})
        }
    },
    createSubCategory : (data)=>{
        return async (dispatch)=>{
            let response = await axios.post("http://localhost:4000/api/subcategory/", data)
            dispatch({type:"UPLOAD_SUBCATEGORY", payload: response.data})
        }
    }

}

export default categoryActionsRedux