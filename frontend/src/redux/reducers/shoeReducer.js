const initialState = {
    shoes: null,
    filteredShoes: null
}

const shoeReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export default shoeReducer