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
  },
  modifyshoe: (data)=>{
      return async (dispatch)=>{
          let response = axios.put("http://localhost:4000/api/shoes", data)
          dispatch({type: "MODIFY_SHOE", payload:response.data.response})
      }
  },
  uploadShoe:(shoe)=>{
    return async (dispatch)=>{
        let response = axios.post("http://localhost:4000/api/shoes", shoe)
        dispatch({type: "UPLOAD_SHOE", payload:response.data.response})
    }
  },
  getOneShoe: (id) => {
    return async (dispatch) => {
      let response = await axios.get("http://localhost:4000/api/shoe/" +id )
      if (response.data.succes) dispatch({type: "getShoe", payload: response.data.response})
      else console.error("Salio mal")
    }
  }

}

export default shoeActions