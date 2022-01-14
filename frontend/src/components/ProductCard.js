import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

const ProductCard = ({ shoe, ...props }) => {

  

  return (
    <>
      <div className="shoe-card-container">
        <div
          className="shoe-card-image"
          style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={shoe.image}
            style={{ height: "20rem", objectFit: "cover" }}
          />
        </div>
        <div
          style={{ padding: "1rem", borderTop: "1px solid black" }}
          className="shoe-card-info"
        >
          <h5 style={{ textAlign: "left" }}>{shoe.name}</h5>
          <h6>${shoe.price}</h6>
          <div
            className="shoe-card-icons"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/shoe/${shoe._id}`}
            >
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className="read-more"
              >
                <p style={{ fontWeight: "bold" }}>MORE INFO</p>
                <img
                  style={{
                    width: "2rem",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  src="../assets/eye-read.png"
                />
              </div>
            </Link>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="add-cart"
            >
              <p style={{ fontWeight: "bold" }}> ADD TO CART </p>
              <button onClick={()=>props.addToCart(props.cart, true, shoe)} disabled={props.user?false:true}>
                <img
                  style={{
                    width: "2rem",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}

                  src="../assets/carrito-de-compras.png"
                  alt="shopping cart"
                  
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    cart: state.userReducer.cart,
    user: state.userReducer.user
  };
};
const mapDispatchToProps = {
  addToCart: userActions.addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);