import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Typewriter from "typewriter-effect";
import { getShoesCount } from "../redux/actions/categoryActions";

const MainShop = ({ shoes }) => {
  const [shoesCount, setShoesCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getShoesCount().then((res) => setShoesCount(res.data));
  }, []);

  return (
    <>
      <main>
        <div
          style={{ fontWeight: "bold", fontSize: "3.5rem" }}
          className="div-titulo"
        >
          <Typewriter
            options={{
              strings: ["Slippers", "Discover the best shoes!"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        <div className="container">
          <div className="row">
            {shoes &&
              shoes.map((shoe) => (
                <div
                  key={shoe._id}
                  style={{ marginTop: "1rem" }}
                  className="productCard col-lg-4"
                >
                  <ProductCard shoe={shoe} />
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainShop;
