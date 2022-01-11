import axios from 'axios';

const shoeActions = {

  getShoes: () => {
    return async (dispatch) => {

      axios
        .get("http://localhost:4000/api/shoes")
        .then((res) =>
          dispatch({ type: "getShoes", payload: res.data.response })
        )
        .catch(err => console.error(err))
    };
  },
  filterShoes: (shoes, searchValue) => {
    return async (dispatch) => {
      const filteredShoes = shoes.filter(searchShoes => {
        return (
          searchShoes.name.toLowerCase().trim().startsWith(searchValue.toLowerCase().trim())
          || searchShoes.gender.toLowerCase().trim().startsWith(searchValue.toLowerCase().trim())
          || searchShoes.color.toLowerCase().trim().startsWith(searchValue.toLowerCase().trim())
          || searchShoes.season.toLowerCase().trim().startsWith(searchValue.toLowerCase().trim())
          )
      })

      dispatch({ type: 'filterShoes', payload: filteredShoes })
    }
  }

}

export default shoeActions