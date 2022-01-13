const initialState = {
  shoes: null,
  filteredShoes: null,
  categories: [],
  subCategories: [],
  category: null,
  oneShoe: {},
};

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
      };
    case "getShoe":
      return {
        ...state,
        oneShoe: action.payload,
      };
    case "filterShoes":
      return {
        ...state,
        filteredShoes: action.payload,
      };
    case "UPLOAD_SHOE":
      let current = [];
      if (state.shoes !== null) {
        console.log("se agrega" + JSON.stringify(action.payload));
        current = state.shoes.concat(action.payload);
      } else {
        state.shoes = [];
        current = state.shoes.concat(action.payload);
      }
      return {
        ...state,
        shoes: getUniqueValues(current),
      };
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_SUBCATEGORIES_BY_PARENT":
      let newSubcategories = state.subCategories.concat(action.payload);
      return {
        ...state,
        subCategories: getUniqueValues(newSubcategories),
      };
    case "UPLOAD_CATEGORY":
      console.log(action.payload);
      let newCategories = state.categories.concat(action.payload);
      return {
        ...state,
        categories: getUniqueValues(newCategories),
      };
    case "SEND_DELETE_SLUG":
      console.log(action.payload);
      let categoryDelete = state.categories.find(
        (category) => category.slug === action.payload
      );
      return {
        ...state,
        category: categoryDelete,
      };
    case "DELETE_CATEGORY":
      let actualCategories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
      return {
        ...state,
        categories: actualCategories,
      };
    case "MODIFY_CATEGORY":
      let currentCategories = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          category = action.payload;
        }
        return category;
      });
      return {
        ...state,
        categories: currentCategories,
      };
    case "DELETE_SUBCATEGORY":
      let actualSubcategories = state.subCategories.filter(
        (sub) => sub._id !== action.payload._id
      );
      return {
        ...state,
        subCategories: actualSubcategories,
      };
    case "MODIFY_SUBCATEGORY":
      let currentSubcategories = state.categories.map((sub) => {
        if (sub._id === action.payload._id) {
          sub = action.payload;
        }
        return sub;
      });
      return {
        ...state,
        categories: currentSubcategories,
      };
    default:
      return state;
  }
};

export default shoeReducer;
