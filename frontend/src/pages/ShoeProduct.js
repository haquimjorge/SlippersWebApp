import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toastr } from "react-redux-toastr"
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import CarouselMarcas from "../components/CarouselMarcas";
import "../shoeDetails.scss";
import userActions from "../redux/actions/userActions";
import Paypal from '../components/Paypal';

const ShoeProduct = (props) => {

  function addToCart() {
    if (props.user) {
      toastr.success("Item Added!", props.oneShoe.name);
      props.addToCart(props.cart, true, props.oneShoe);
    }
    else toastr.error("You can't use the cart","You must log in first")
  }

  useEffect(() => {
    props.getOneShoe(props.params.shoesId);
  }, []);

  console.log(props.oneShoe)
  console.log(props.getOneShoe)
  useEffect(() => {
    console.log(props.cart);
  }, [props.cart]);

  console.log(props.oneShoe.variations)
  return (
    <>
      <div className="fondo-menu-sign p-4">
        <Menu />
      </div>
      <div className="shoe-body">
        <div className="shoe-container">
          <div className="images">
            <img
              className="zoom"
              src={props.oneShoe.image}
              alt="zoomed"
            />
          </div>
          <div className="slideshow-buttons">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
          </div>
          <div className="contenedor-colors-sizes">
            <p className="pick">available sizes</p>
            <div className="sizes">
              {props.oneShoe.variations && props.oneShoe.variations.map((elem) => elem.size).map((elem) =>
                <div className="size">{elem}</div>
              )}
            </div>
            <p className="pick">available colors</p>
            <div className="colors">
              {props.oneShoe.variations && props.oneShoe.variations.map((elem) => elem.color).map((elem) =>
                <div className="color" style={{ backgroundColor: elem.toLowerCase() }}></div>
              )}
            </div>
          </div>
          <div className="product">
            <p>Male elegant shoe</p>
            <h1 className="titulo-shoeProduct">{props.oneShoe.name}</h1>
            <h2 className="titulo-shoePrice">${props.oneShoe.price}</h2>
            <p className="desc">{props.oneShoe.description}</p>
            <p className="desc">Type: One cut</p>
            <p className="desc">Exterior: Patent cow leather</p>
            <p className="desc">Interior: Full grain goat leather</p>
            <p className="desc">Sole: Full grain cow leather</p>
            <p className="desc">Heel: Full grain cow leather with Rubber top</p>
            <p className="desc">Height: 3.5 cm / 1.38 inches</p>
            <div className="select">
              <select className="select-shoes">
                <option value="1">Choose you size</option>
                {props.oneShoe.variations && props.oneShoe.variations.map((elem) => elem.size).map((elem) =>
                  <option value={elem}>{elem}</option>
                )}
              </select>
            </div>
            <div className="select">
              <select className="select-shoes">
                <option value="1">Choose your color</option>
                {props.oneShoe.variations && props.oneShoe.variations.map((elem) => elem.color).map((elem) =>
                  <option value={elem}>{elem}</option>
                )}
              </select>
            </div>
            <div className="buttons">
              <button
                className="add"
                onClick={() => addToCart()}
                
              >
                Add to Cart
              </button>
              <button className="like">♥</button>
              {/* <Paypal /> */}
            </div>
          </div>
        </div>
      </div>
      <CarouselMarcas />
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  getOneShoe: shoeActions.getOneShoe,
  addToCart: userActions.addToCart,
};

const mapStateToProps = (state) => {
  return {
    oneShoe: state.shoeReducer.oneShoe,
    cart: state.userReducer.cart,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoeProduct);
