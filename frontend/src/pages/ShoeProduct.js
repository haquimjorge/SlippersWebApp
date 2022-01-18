import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import "../shoeDetails.scss";
import userActions from "../redux/actions/userActions";


const ShoeProduct = (props) => {

  useEffect(() => {
    props.getOneShoe(props.params.shoesId);
  }, []);

  console.log(props.oneShoe)
  useEffect(() => {
    console.log(props.cart)
  }, [props.cart]);

  return (<>
    <Menu />
    <div className="shoe-body">
      <div className="shoe-container">
        <div className="images">
          <img className="zoom" src="https://d3ugyf2ht6aenh.cloudfront.net/stores/090/848/products/081ddb2b-257b-4145-8dd1-d7a40792be65-c1eac204abe79eb80616190381701708-320-0.jpg" alt="zoomed" />
        </div>
        <div className="slideshow-buttons">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
        </div>
        <p className="pick">choose size</p>
        <div className="sizes">
          <div className="size">5</div>
          <div className="size">6</div>
          <div className="size">7</div>
          <div className="size">8</div>
          <div className="size">9</div>
          <div className="size">10</div>
          <div className="size">11</div>
          <div className="size">12</div>
        </div>
        <div className="product">
          <p>Male elegant shoe</p>
          <h1>{props.oneShoe.name}</h1>
          <h2>${props.oneShoe.price}</h2>
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
              <option value="2">5</option>
              <option value="3">6</option>
              <option value="4">8</option>
              <option value="5">9</option>
              <option value="6">10</option>
              <option value="7">11</option>
              <option value="8">12</option>
            </select>
          </div>
          <div className="select">
            <select className="select-shoes">
              <option value="1">Choose your color</option>
              <option value="2">Black</option>
              <option value="3">Grey</option>
              <option value="4">Brown</option>
              <option value="5">Gold</option>
            </select>
          </div>
          <div className="buttons">
            <button className="add"  onClick={()=>props.addToCart(props.cart, true, props.oneShoe)} disabled={props.user?false:true}>Add to Cart</button>
            <button className="like">♥</button>
            <button className="paypal">PayPal</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    

  </>);
};

const mapDispatchToProps = {
  getOneShoe: shoeActions.getOneShoe,
  addToCart: userActions.addToCart
};

const mapStateToProps = (state) => {
  return {
    oneShoe: state.shoeReducer.oneShoe,
    cart: state.userReducer.cart,
    user: state.userReducer.user
  };
};





export default connect(mapStateToProps, mapDispatchToProps)(ShoeProduct);
