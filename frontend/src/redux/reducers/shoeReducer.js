const initialState = {
    shoes: null,
    filteredShoes: null,
    oneShoe: {}
}

const shoeReducer = (state = initialState, action) => {
    function getUniqueValues(array) {
        let result = [];
        const map = new Map();
        for (const item of array) {
          if (!map.has(item._id)) {
            map.set(item._id, true);
            result.push(item);
          }
        }
        return result;
      }
    switch (action.type) {
        case "getShoes":
            return {
                ...state,
                shoes: action.payload,
            }
        case "filterShoes":
            return {
                ...state,
                filteredShoes:action.payload
            }
            case "UPLOAD_SHOE":
                let current= []
                if(state.shoes!==null){
                    current = state.shoes.concat(action.payload)
                }else{
                    state.shoes=[]
                    current=state.shoes.concat(action.payload)
                }
                return{
                    ...state,
                    shoes: getUniqueValues(current)
                }
            case "getShoe":
                return {
                    ...state,
                    oneShoe: action.payload
                }
        default:
            return state;
    }
}

export default shoeReducer