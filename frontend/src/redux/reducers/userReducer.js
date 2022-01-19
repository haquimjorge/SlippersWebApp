const initialState = {
  user: null,
  success: null,
  error: null,
  message: null,
  cart: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        success: action.payload.info.success,
        error: action.payload.info.error,
        user: action.payload.info.response,
        message: action.payload.info.message
      };
    case "LOG_OUT":
      return {
        ...initialState,
      };
    case "IS_AUTH":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        cart: action.payload
      }
    case "DELETE_PRODUCT":
      
      return { 
        ...state, 
        cart: action.payload,
      }

      case "EMPTY_CART":
          return{
            ...state,
            cart:[]
          }
    default:
      return state;
  }
}

export default userReducer