import Menu from "../components/Menu";
import Footer from "../components/Footer";
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux";

const Checkout = (props) => {
  function calculoTotal() {
    if (props.cart.length) {
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      let total = props.cart.map((elemento) => elemento.price).reduce(reducer);
      return total;
    } else {
      return 0;
    }
  }

  return (
    <>
      <div className="fondo-menu-sign p-4">
        <Menu />
      </div>

      <div className="contenedor-mainCheck">
        <div className="fondo-contenedorCheck">
          <h1 className="pb-5">Chosen products</h1>
          <div className="contenedor-check">
            <div className="item-check">
              <div className="contenedor-ppCheck">
                <h2>Products:</h2>
                <h2>Price:</h2>
              </div>
              {props.cart.map((elemento) => {
                return (
                  <div className="contenedor-returnCheck d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <img src={elemento.image} />
                      <h3 className="ps-4">{elemento.name}</h3>
                    </div>
                    <h6
                      id="button"
                      onClick={() =>
                        props.addToCart(props.cart, false, elemento)
                      }
                    >
                      Delete
                    </h6>
                    <h4>{elemento.price} $</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="fondo-contenedorCheck final">
          <div className="contenedor-check">
            <div className="item-check">
              <h1>Confirm Your Purchase</h1>
              <div className="contenedor-compra">
                <h2>Total: {calculoTotal()} $</h2>
              </div>
              <button>FINALIZE PURCHASE</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  addToCart: userActions.addToCart,
};

const mapStateToProps = (state) => {
  return {
    cart: state.userReducer.cart,
    shoes: state.shoeReducer.shoes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
