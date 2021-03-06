import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import CarouselMarcas from "../components/CarouselMarcas";
import MainShop from "../components/MainShop";
import shoeActions from "../redux/actions/shoeActions";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `$${value}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Shop = (props) => {
  const colors = [
    "black",
    "blue",
    "brown",
    "gray",
    "green",
    "orange",
    "pink",
    "purple",
    "red",
    "teal",
    "violet",
    "white",
    "yellow",
  ];
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([0, 100000]);
  const [checked, setChecked] = useState([
    { type: "gender", value: [] },
    { type: "color", value: [] },
    { type: "season", value: [] },
    { type: "text", value: "" },
    { type: "price", value: value },
  ]);
  const checkedRef = useRef(checked);

  useEffect(() => {
    console.log(props.shoes);
    console.log(props.filteredShoes);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.shoes, props.filteredShoes]);

  useEffect(() => {
    if (!props.shoes) props.getShoes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(props.cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cart]);

  useEffect(() => {
    console.log(checked);
  }, [colors]);

  console.log(props.cart)
  
  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const list = checked;
    let newData = list.filter((element) => element.type === "text");
    const index = list.indexOf(newData[0]);

    list[index].value = searchValue;
    checkedRef.current = [...list];
    setChecked([...list]);

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

    props.filterShoes(props.shoes, checkedRef.current);
  };

  const handleSlider = (e, newValue) => {
    setValue(newValue);
    const list = checked;
    let newData = list.filter((element) => element.type === "price");
    const index = list.indexOf(newData[0]);

    list[index].value = newValue;
    checkedRef.current = [...list];
    setChecked([...list]);
    props.filterShoes(props.shoes, checkedRef.current);
    //console.log(checkedRef.current)
  };

  return (
    <>
      <div className="fondo-menu-sign pb-5">
        <Menu />
      </div>
      <div className="input-contenedor-home pt-5">
        <label htmlFor="search">Search :</label>
        <input
          className="input-checkShop"
          type="text"
          defaultValue={search}
          placeholder="Search for the shoes you want"
          autoComplete="off"
          className="text-light"
          onChange={handleChange}
          id="search"
        />
        <button type="submit">Ok</button>
      </div>
      <h4
        style={{ backgroundColor: "black" }}
        className="titulo-mainShop text-center display-4"
      >
        Our shoes!
      </h4>
      <div className="shop-body">
        <div className="filters">
          <h5 className="h5">Color</h5>
          {colors.map((color, index) => {
            return (
              <div>
                <input
                  className="input-checkShop"
                  type="checkbox"
                  id={"color" + (index + 1)}
                  value={color}
                  onChange={(e) =>
                    handleCheck(e, { type: "color", value: color })
                  }
                />
                <label htmlFor={"color" + (index + 1)}>
                  {capitalizeFirstLetter(color)}{" "}
                </label>
              </div>
            );
          })}

          <h5 className="h5">Gender</h5>
          <div>
            <input
              className="input-checkShop"
              type="checkbox"
              id="gender1"
              value="male"
              onChange={(e) =>
                handleCheck(e, { type: "gender", value: "female" })
              }
            />
            <label htmlFor="gender1"> Female</label>
          </div>
          <div>
            <input
              className="input-checkShop"
              type="checkbox"
              id="gender2"
              value="female"
              onChange={(e) =>
                handleCheck(e, { type: "gender", value: "male" })
              }
            />
            <label htmlFor="gender2"> Male</label>
          </div>
          <div>
            <input
              className="input-checkShop"
              type="checkbox"
              id="gender3"
              value="unisex"
              onChange={(e) =>
                handleCheck(e, { type: "gender", value: "unisex" })
              }
            />
            <label htmlFor="gender3"> Unisex</label>
          </div>

          <h5 className="h5">Season</h5>
          <div>
            <input
              className="input-checkShop"
              type="checkbox"
              id="season1"
              value="spring-summer"
              onChange={(e) =>
                handleCheck(e, { type: "season", value: "spring/summer" })
              }
            />
            <label htmlFor="season1"> Spring-Summer</label>
          </div>
          <div>
            <input
              className="input-checkShop"
              type="checkbox"
              id="season2"
              value="winter-autum"
              onChange={(e) =>
                handleCheck(e, { type: "season", value: "winter/autumn" })
              }
            />
            <label htmlFor="season2"> Winter-Autum</label>
          </div>

          <h5 className="h5">Price</h5>
          <div className="minMax d-flex justify-content-between">
            <h6>Min</h6>
            <h6>Max</h6>
          </div>
          <div className="w-100">
            <Slider
              getAriaLabel={() => "Price"}
              value={value}
              onChange={handleSlider}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={
                props.shoes
                  ? Math.max.apply(
                      Math,
                      props.shoes.map((shoe) => {
                        return shoe.price;
                      })
                    )
                  : 300
              }
            />
          </div>
        </div>
        <div>
          <MainShop
          style={{"min-width":"85vw"}}
            shoes={
              props.filteredShoes
                ? props.filteredShoes
                : props.shoes
                ? props.shoes
                : []
            }
          />
        </div>
      </div>

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
    cart: state.userReducer.cart,
    shoes: state.shoeReducer.shoes,
    filteredShoes: state.shoeReducer.filteredShoes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
