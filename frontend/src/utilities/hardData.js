const range = Array.from({ length: 30 }, (x, i) => i + 20);
const CSS_COLOR_NAMES = [
  "Black",
  "Blue",
  "Brown",
  "Gray",
  "Green",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Teal",
  "Violet",
  "White",
  "Yellow",
];
const GENDER = ["Male", "Female", "Unisex"]
const SEASONS = ["Winter/Autumn", "Spring/Summer", "All Seasons"]
const SHIPPING = ["Yes","No"]

const DATA = {
  colors: CSS_COLOR_NAMES,
  sizes: range,
  gender: GENDER,
  seasons:SEASONS,
  shipping: SHIPPING
};


export default DATA
