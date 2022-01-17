import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import CarouselMarcas from "../components/CarouselMarcas";
import MainShop from "../components/MainShop";
import shoeActions from "../redux/actions/shoeActions";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { process_params } from "express/lib/router";

const Shop = (props) => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([
    { type: "gender", value: [] },
    { type: "color", value: [] },
    { type: "season", value: [] },
    { type: "text", value: "" },
  ]);
  const [filtered, setFiltered] = useState(false);
  const checkedRef = useRef(checked);

  useEffect(() => {
    console.log(props.filteredShoes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.shoes, props.filteredShoes]);
  useEffect(() => {
    if (!props.shoes) props.getShoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const list = checked;
    let newData = list.filter((element) => element.type === "text");
    const index = list.indexOf(newData[0]);

    list[index].value = searchValue;
    checkedRef.current = [...list];
    setChecked([...list]);
    console.log(checkedRef.current);
    props.filterShoes(props.shoes, checkedRef.current);
  };
  const handleCheck = (e, data) => {
    const list = checked;
    let newData = list.filter((element) => element.type === data.type);
    const index = list.indexOf(newData[0]);

    if (e.target.checked) {
      list[index].value = [...newData[0].value, data.value];
      checkedRef.current = [...list];
      setChecked([...list]);
    } else {
      if (list.length > 0) {
        const valueIndex = newData[0].value.indexOf(data.value);
        if (valueIndex > -1) newData[0].value.splice(valueIndex, 1);
        checkedRef.current = [...list];
        setChecked([...list]);
      }
    }

    //console.log(checkedRef.current)
    //checkedRef.current.forEach((element,index)=>console.log(index,"-",element))
    //console.log(checkedRef.current)
    //if(props.filteredShoes) props.filterShoes(props.filteredShoes, checkedRef.current)
    props.filterShoes(props.shoes, checkedRef.current);
  };

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
      <div className="fondo-menu-sign pb-5">
        <Menu />
      </div>
      <div className="input-contenedor-home pt-5">
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
      <div className="contenedor-inputcheck-shop">
        <div className="item-inputcheck-shop">
          <label htmlFor="season1"> Spring-Summer</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="season1"
            value="spring-summer"
            onChange={(e) =>
              handleCheck(e, { type: "season", value: "spring-summer" })
            }
          />
        </div>
        <div className="item-inputcheck-shop">
          <label htmlFor="color1"> Blue</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="color1"
            value="blue"
            onChange={(e) => handleCheck(e, { type: "color", value: "blue" })}
          />
        </div>
        <div className="item-inputcheck-shop">
          <label htmlFor="color2"> Black</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="color2"
            value="black"
            onChange={(e) => handleCheck(e, { type: "color", value: "black" })}
          />
        </div>
        <div className="item-inputcheck-shop">
          <label htmlFor="color3"> Green</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="color3"
            value="green"
            onChange={(e) => handleCheck(e, { type: "color", value: "green" })}
          />
        </div>
        <div className="item-inputcheck-shop">
          <label htmlFor="gender1"> Female</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="gender1"
            value="male"
            onChange={(e) =>
              handleCheck(e, { type: "gender", value: "female" })
            }
          />
        </div>
        <div className="item-inputcheck-shop">
          <label htmlFor="gender2"> Male</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="gender2"
            value="female"
            onChange={(e) => handleCheck(e, { type: "gender", value: "male" })}
          />
        </div>
        <div className="item-inputcheck-shop">
          <label htmlFor="season2">Winter-Autum</label>
          <input
            className="inputcheck-shop"
            type="checkbox"
            id="season2"
            value="winter-autum"
            onChange={(e) =>
              handleCheck(e, { type: "season", value: "winter-autumn" })
            }
          />
        </div>
      </div>

      <MainShop
        shoes={
          props.filteredShoes
            ? props.filteredShoes
            : props.shoes
            ? props.shoes
            : []
        }
      />
      <CarouselMarcas />
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
