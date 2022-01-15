const initialState = {
  shoes: null,
  filteredShoes: null,
  categories: [],
  subCategories: [],
  allSubCategories:[],
  category: null,
  oneShoe: {},
  shoeToDelete:{}
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
      case "MODIFY_SHOE":
        let currentShoes = state.shoes.map((shoe) => {
            if (shoe._id === action.payload._id) {
              shoe = action.payload;
            }
            return shoe;
          });
          return{
              ...state,
              shoes:currentShoes
          }
      case "ID_TO_DELETE_SHOE":
          let shoeToDelete = state.shoes.find(shoe=> shoe._id === action.payload)
          return{
              ...state,
              shoeToDelete:shoeToDelete

          }
      case "DELETE_SHOE":
          let deletedShoeList = state.shoes.filter(shoe=>shoe._id !== action.payload._id) 
          return{
              ...state,
              shoes: deletedShoeList
          }
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
      case "GET_ALL_SUBCATEGORIES":
          return{
              ...state,
              allSubCategories:action.payload

          }
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
    case "SEND_SUB_SLUG":
      let subCategoryDelete = state.allSubCategories.find(
        (category) => category.slug === action.payload
      );
      return {
        ...state,
        category: subCategoryDelete,
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
        console.log(action.payload)
      let actualSubcategories = state.allSubCategories.filter(
        (sub) => sub._id !== action.payload._id
      );
      return {
        ...state,
        allSubCategories: actualSubcategories,
      };
    case "MODIFY_SUBCATEGORY":
      console.log(action.payload);
      let currentSubcategories = state.allSubCategories.map((sub) => {
        if (sub._id === action.payload._id) {
          sub = action.payload;
        }
        return sub;
      });
      console.log(currentSubcategories);
      return {
        ...state,
        allSubCategories: currentSubcategories,
      };
      case "UPLOAD_SUBCATEGORY":
          let addedSubcategories = state.allSubCategories.concat(action.payload)
          return{
              ...state,
              allSubCategories: getUniqueValues(addedSubcategories)
          }
    default:
      return state;
  }
};

export default shoeReducer;
