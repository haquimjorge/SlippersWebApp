import axios from "axios";
import {toastr} from 'react-redux-toastr'

const userActions ={
    googleLogin: (user) => {
        return async (dispatch) => {
          let response = await axios.post(
            "http://localhost:4000/api/auth/google",
            user
          );
          if (response.data.response) {
            localStorage.setItem("token", response.data.token);
            console.log(response.data.response)
            toastr.success("Logged In!" , `Welcome, ${response.data.response.name}`)
          }
          console.log(response)
    
          dispatch({
            type: "SAVE_USER",
            payload: { info: response.data, loading: false },
          });
        };
      },
      signUpUser:(user, data)=>{
          return async (dispatch)=>{
              console.log(user)
              console.log(data)
              let response = await axios.post("http://localhost:4000/api/auth/signup",user)
              let fileResponse = await axios.post("http://localhost:4000/api/files/upload", data)
              if(fileResponse.data.error){
                  toastr.error(fileResponse.data.error)
              }
              if (response.data.response) {
                localStorage.setItem("token", response.data.token);
              }
              dispatch({
                type: "SAVE_USER",
                payload: { info: response.data, loading: false },
              });
          }
      },
      signInUser: (user) => {
        return async (dispatch) => {
          let response = await axios.post(
            "http://localhost:4000/api/auth/signin",user
          );
          if (response.data.response) {
            localStorage.setItem("token", response.data.token);
          }
          dispatch({
            type: "SAVE_USER",
            payload: { info: response.data, loading: false },
          });
        };
      },
      logOut: () => {
        return (dispatch) => {
          localStorage.clear();
          toastr.error("Logged Out!")
          dispatch({ type: "LOG_OUT", payload: {} });
        };
      },
      authUser: () => {
        return async (dispatch) => {
          try {
            const token = localStorage.getItem("token");
            const user = await axios.get(
              "http://localhost:4000/api/auth",
              {
                headers: { Authorization: "Bearer " + token },
              }
            );
            console.log(user)
    
            dispatch({ type: "IS_AUTH", payload: user.data.response });
            return { response: user.data.response };
          } catch (e) {
            return { error: "Unauthorized user, try login again" };
          }
        };
      },
      verifyEmail : (uniqueString)=>{
          return async (dispatch)=>{
              let response = await axios.get("http://localhost:4000/api/verify/"+uniqueString)
              if (response.data.response) {
                localStorage.setItem("token", response.data.token);
              }
              dispatch({
                type: "SAVE_USER",
                payload: {info: response.data},
              });
    
          }
      },
      addToCart : (cart, isAdded, product)=>{
        
        


        return async (dispatch)=>{
          //await axios.put("http://localhost:4000/api/cart",{userId, isAdded, product})
          //.then(response=>{
          //  if(response.data.success)dispatch({type:"UPDATE", payload: user})
          //  return response.data.success
          //}).catch(err=>console.error(err))
          let newCart = [...cart] 
          if(isAdded){
            if(!product.quantity){ 
              product.quantity = 1 
              newCart.push(product)
            } 
            else product.quantity +=1
            
            dispatch({type:"ADD_PRODUCT", payload: newCart})
          }
          else{
            product.quantity -=1
            if (product.quantity<1){
              
              newCart = newCart.filter(element => product._id !== element._id)
            }  
            
            //newCart = newCart.filter(element => product !== element)
            dispatch({type:"DELETE_PRODUCT", payload: newCart})
        }

        }
      },
      emptyCart : () =>{
          return (dispatch)=> {
              dispatch({type:"EMPTY_CART", payload:{}})

          }
      }
}

export default userActions