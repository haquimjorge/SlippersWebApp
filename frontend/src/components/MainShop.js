import React from "react";
import ProductCard from "./ProductCard";

const MainShop = ({ shoes }) => {

  console.log(shoes)
  return (
    <>
      <main>
        <div className="div-titulo">
          <h1 className="titulo">Slippers - MAIN SHOP</h1>
        </div>

        <div className="container">
          <div className="row">
            {shoes.map((shoe) => (
              <div key={shoe._id} style={{marginTop: "1rem"}} className="col-lg-4">
                <ProductCard shoe={shoe}/>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainShop;
