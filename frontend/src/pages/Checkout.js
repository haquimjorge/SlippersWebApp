import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Checkout = (props) => {
  const [mostrar, setMostrar] = useState();

  return (
    <>
      <div className="fondo-menu-sign p-4">
        <Menu />
      </div>

      <div className="contenedor-mainCheck">
        <h1>Productos elegidos</h1>
        <div className="contenedor-check">
          <div className="item-check">
            <h2>Productos</h2>
            <h3>Slippers</h3>
            {/* {props.cart.map((elemento) => {
               <h1>{elemento.name}</h1>;
            })} */}
          </div>
          <div className="item-check">
            <h2>Cantidad</h2>
            <h3>10</h3>
          </div>
          <div className="item-check">
            <h2>Total</h2>
            <h3>500$</h3>
          </div>
        </div>
        <h1>Confirmacion de compra</h1>
        <div className="contenedor-compra">
          <h2>Total a pagar:</h2>
          <h3>500$</h3>
        </div>
        <button>FINALIZAR COMPRA</button>
      </div>

      <Footer />
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
