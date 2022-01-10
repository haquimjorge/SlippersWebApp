const initialState = {
    shoes: null
}

const shoeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "getShoes":
            return {
                ...state,
                shoes: action.payload,
            }
        default:
            return state;
    }
}

export default shoeReducer