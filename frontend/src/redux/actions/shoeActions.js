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
      let filteredShoes = [...shoes]
      if (Array.isArray(searchValue)) {

        if (searchValue.length > 0)
          searchValue.forEach(element => {


            filteredShoes = filteredShoes.filter(searchShoes => {
              
              return (
                !element.value.length > 0 ? true
                  : (element.type === 'gender') ? element.value.includes(searchShoes.gender.toLowerCase().trim())
                    : (element.type === 'color' && searchShoes.color) ? element.value.includes(searchShoes.color.toLowerCase().trim())
                    : (element.type=='color' && searchShoes.variations)? searchShoes.variations.filter(variation=> element.value.includes(variation.color.toLowerCase().trim())).length>0 
                      : (element.type === 'season') ? element.value.includes(searchShoes.season.toLowerCase().trim())
                      : (element.type === 'price') ? (searchShoes.price>=element.value[0] && searchShoes.price<=element.value[1])
                        : (element.type === 'text') && (
                          searchShoes.name.toLowerCase().trim().startsWith(element.value.toLowerCase().trim())
                          || searchShoes.gender.toLowerCase().trim().startsWith(element.value.toLowerCase().trim())
                          || ( searchShoes.variations && searchShoes.variations.length>0 && ( searchShoes.variations.filter(variation=> variation.color.toLowerCase().trim().startsWith(element.value.toLowerCase().trim())).length>0 ) )
                          || searchShoes.season.toLowerCase().trim().startsWith(element.value.toLowerCase().trim())
                          || ( (searchShoes.category && searchShoes.category.name.toLowerCase().trim().startsWith(element.value.toLowerCase().trim()))  )
                          || ( (searchShoes.subcategory && searchShoes.subcategory.length>0) && (searchShoes.subcategory.filter(sub=> sub.name.toLowerCase().trim().startsWith(element.value.toLowerCase().trim())).length>0 ) )
                        )
              )
            })

          })

      }
      else {
        filteredShoes = []
      }

      dispatch({ type: 'filterShoes', payload: filteredShoes })
    }
  },
  modifyShoe: (data) => {
    return async (dispatch) => {
      let response = await axios.put("http://localhost:4000/api/shoes", data)
      dispatch({ type: "MODIFY_SHOE", payload: response.data.response })
    }
  },
  uploadShoe: (shoe) => {
    return async (dispatch) => {
      let response = await axios.post("http://localhost:4000/api/shoes", shoe)
      console.log(response)
      dispatch({ type: "UPLOAD_SHOE", payload: response.data.response })
    }
  },
  getOneShoe: (id) => {
    return async (dispatch) => {
      let response = await axios.get(`http://localhost:4000/api/shoe/${id.toString()}`)
      dispatch({type: "getShoe", payload: response.data.response})
    }
  },
  deleteShoe : (id)=>{
      return async (dispatch)=>{
          let response = await axios.delete(`http://localhost:4000/api/shoe/${id}`)
          dispatch({type: "DELETE_SHOE", payload: response.data.response})
      }
  },
  sendIdtoDeleteShoe : (id)=>{
      return (dispatch)=>{
          dispatch({type: "ID_TO_DELETE_SHOE", payload:id})
      }
  },
  editVariation : (id, variation,generalStock,variationExist)=>{
      return async (dispatch)=>{
          let response = await axios.put("http://localhost:4000/api/shoe", {id,variation,generalStock, variationExist})
          dispatch({type:"MODIFY_SHOE", payload: response.data.response})
      }
  },
  sendIdtoEdit : (id)=>{
    return (dispatch)=>{
        dispatch({type: "ID_TO_EDIT", payload:id})
    }
},

}

export default shoeActions