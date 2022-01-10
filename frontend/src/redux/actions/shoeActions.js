import axios from 'axios';

const shoeActions = {

    getShoes: () => {
        return (dispatch) => {
        axios
            .get("http://localhost:4000/api/shoes")
            .then((res) =>
              dispatch({ type: "getShoes", payload: res.data.response })
            );
        };
      }, 
    
}

export default shoeActions