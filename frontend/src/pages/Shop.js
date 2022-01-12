import React from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import Footer from "../components/Footer";
import MainShop from "../components/MainShop";
import shoeActions from "../redux/actions/shoeActions";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";

const Shop = (props) => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([])
  const checkedRef = useRef(checked)

  useEffect(() => {
    if (!props.shoes) props.getShoes();
    console.log(props.shoes);
    console.log(props.filteredShoes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.shoes, props.filteredShoes]);
  useEffect(() => {
    props.getShoes();
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (!checked) props.filterShoes(props.shoes, searchValue);
    else props.filterShoes(props.filteredShoes, searchValue)

    console.log(props.filteredShoes);
  };
  const handleCheck = (e, value) => {
    const list = checked
    if(e.target.checked){
      checkedRef.current = [...list,value]
      setChecked([...list, value])
    }
    else{
      if(list.length>0){
        checkedRef.current = list.filter( (check)=> check!==value )
        setChecked( list.filter( (check)=> check!==value ) )
      }
    }
    
    //console.log(checkedRef.current)
    checkedRef.current.forEach((element,index)=>console.log(index,"-",element))
    if(props.shoes) props.filterShoes(props.shoes, checkedRef.current)
    

  }

  return (
    <>
      <Menu />
      <div className="input-contenedor-home">
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
      </div>


      <input type="checkbox" id="option1" value="Blue" onChange={(e)=>handleCheck(e, "Blue")}/>
      <label htmlFor="option1"> Blue</label>
      <input type="checkbox" id="option2" value="Black" onChange={(e)=>handleCheck(e, "Black")}/>
      <label htmlFor="option2"> Black</label>
      <input type="checkbox" id="option3" value="Green" onChange={(e)=>handleCheck(e, "Green")}/>
      <label htmlFor="option3"> Green</label>

      <MainShop />
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
