import React from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import Footer from "../components/Footer";
import MainShop from "../components/MainShop";
import shoeActions from "../redux/actions/shoeActions";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getShoez } from "../redux/actions/categoryActions";

const Shop = (props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
      props.getShoes()
    // loadAllShoes();
  }, []);

//   const loadAllShoes = () => {
//     setLoading(true);
//     getShoez().then((res) => {
//       setShoes(res.data);
//       setLoading(false);
//     });
//   };

  // useEffect(() => {
  //   if (!props.shoes) props.getShoes();
  //   console.log(props.shoes)
  //   console.log(props.filteredShoes);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.shoes, props.filteredShoes]);

  // const handleChange = (e) => {
  //   const searchValue = e.target.value;
  //   setSearch(searchValue);
  //   props.filterShoes(props.shoes, searchValue);
  //   console.log(props.filteredShoes);
  // };

  return (
    <>
      <Menu />
      {/* <div className="input-contenedor-home">
        <label htmlFor="search">Search :</label>
        <input
          type="text"
          defaultValue={search}
          placeholder="Search for the shoes you want"
          autoComplete="off"
          onChange={handleChange}
          id="search"
        />
        <button type="submit">Ok</button>
      </div> */}
      <MainShop shoes={props.shoes} />
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  getShoes: shoeActions.getShoes,
  filterShoes: shoeActions.filterShoes,
};
const mapStateToProps = (state) => {
  return {
    shoes: state.shoeReducer.shoes,
    filteredShoes: state.shoeReducer.filteredShoes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
