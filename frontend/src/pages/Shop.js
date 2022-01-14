import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MainShop from "../components/MainShop";
import shoeActions from "../redux/actions/shoeActions";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Slider from '@mui/material/Slider';


function valuetext(value) {
  return `$${value}`;
}

const Shop = (props) => {
  const [search, setSearch] = useState("")
  const [value, setValue] = useState([0, 300]);
  const [checked, setChecked] = useState([{ type: "gender", value: [] }, { type: "color", value: [] }, { type: "season", value: [] }, { type: "text", value: "" }, { type: 'price', value: value }])
  const checkedRef = useRef(checked)

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.shoes, props.filteredShoes])
  useEffect(() => {
    if (!props.shoes) props.getShoes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(props.cart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cart])

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue)
    const list = checked
    let newData = list.filter(element => element.type === 'text')
    const index = list.indexOf(newData[0])

    list[index].value = searchValue
    checkedRef.current = [...list]
    setChecked([...list])

    props.filterShoes(props.shoes, checkedRef.current)

  };
  const handleCheck = (e, data) => {
    const list = checked
    let newData = list.filter(element => element.type === data.type)
    const index = list.indexOf(newData[0])

    if (e.target.checked) {
      list[index].value = [...newData[0].value, data.value]
      checkedRef.current = [...list]
      setChecked([...list])
    }
    else {
      if (list.length > 0) {
        const valueIndex = newData[0].value.indexOf(data.value)
        if (valueIndex > -1) newData[0].value.splice(valueIndex, 1)
        checkedRef.current = [...list]
        setChecked([...list])

      }
    }


    props.filterShoes(props.shoes, checkedRef.current)

  }

  const handleSlider = (e, newValue) => {
    setValue(newValue)
    const list = checked
    let newData = list.filter(element => element.type === 'price')
    const index = list.indexOf(newData[0])

    list[index].value = newValue
    checkedRef.current = [...list]
    setChecked([...list])
    props.filterShoes(props.shoes, checkedRef.current)
    //console.log(checkedRef.current)
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


      <input type="checkbox" id="color1" value="blue" onChange={(e) => handleCheck(e, { type: "color", value: "blue" })} />
      <label htmlFor="color1"> Blue</label>
      <input type="checkbox" id="color2" value="black" onChange={(e) => handleCheck(e, { type: "color", value: "black" })} />
      <label htmlFor="color2"> Black</label>
      <input type="checkbox" id="color3" value="green" onChange={(e) => handleCheck(e, { type: "color", value: "green" })} />
      <label htmlFor="color3"> Green</label>

      <input type="checkbox" id="gender1" value="male" onChange={(e) => handleCheck(e, { type: "gender", value: "female" })} />
      <label htmlFor="gender1"> Female</label>
      <input type="checkbox" id="gender2" value="female" onChange={(e) => handleCheck(e, { type: "gender", value: "male" })} />
      <label htmlFor="gender2"> Male</label>


      <input type="checkbox" id="season1" value="spring-summer" onChange={(e) => handleCheck(e, { type: "season", value: "spring-summer" })} />
      <label htmlFor="season1"> Spring-Summer</label>
      <input type="checkbox" id="season2" value="winter-autum" onChange={(e) => handleCheck(e, { type: "season", value: "winter-autumn" })} />
      <label htmlFor="season2"> Winter-Autum</label>

      <div className="w-50 ps-5">
        <Slider
          getAriaLabel={() => 'Price'}
          value={value}
          onChange={handleSlider}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={300}
        />
      </div>

      <MainShop shoes={props.filteredShoes ? props.filteredShoes : props.shoes ? props.shoes : []} />
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
    cart: state.userReducer.cart
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
