import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ shoe }) => {
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
                  style={{
                    width: "2rem",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  src="../assets/view.png"
                />
              </div>
            </Link>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              className="add-cart"
            >
              <p style={{ fontWeight: "bold" }}> ADD TO CART </p>
              <img
                style={{
                  width: "2rem",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                src="../assets/carrito-de-compras.png"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
