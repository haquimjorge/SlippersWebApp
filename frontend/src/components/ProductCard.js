import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { toastr } from "react-redux-toastr";
import { Navigate } from "react-router-dom";

const ProductCard = ({ shoe, ...props }) => {
  function addToCart(shoe) {
    if(props.user){
      toastr.success("Item Added!", shoe.name);
      props.addToCart(props.cart, true, shoe);
    }
    else toastr.error("You can't use the cart","You must log in first")
  }

  return (
    <>
      <div className="shoe-card-container">

        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/shoe/${shoe._id}`}
        >
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
              alt={shoe.name}
            />
          </div>
        </Link>
        <div style={{ padding: "1rem" }} className="shoe-card-info">
          <h5 style={{ textAlign: "left" }} className="shoe-name">
            {shoe.name}
          </h5>
          <h6 className="shoe-price">${shoe.price}</h6>
          <div
            className="shoe-card-icons"
            style={{
              display: "flex",
              justifyContent: "space-around",
              borderTop: "1px solid black",
              padding: "10px",
            }}
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
                  className="colored-image-button"
                  style={{
                    width: "2rem",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  src="../assets/view.png"
                  alt="more info"
                />
              </div>
            </Link>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="add-cart"
            >
              <p style={{ fontWeight: "bold" }}> ADD TO CART </p>
              <button
                className="boton-carritoShop"
                onClick={() => addToCart(shoe)}
                
              >
                <img
                  style={{
                    width: "2rem",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  className="colored-image-button"
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
    user: state.userReducer.user,
  };
};
const mapDispatchToProps = {
  addToCart: userActions.addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
