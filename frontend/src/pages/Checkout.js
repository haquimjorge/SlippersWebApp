/* eslint-disable jsx-a11y/alt-text */
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux";
import Paypal from '../components/Paypal';
import Axios from "axios";

const Checkout = (props) => {



  const transactionSuccess = (data) => {

    let variables={
      cartDetail: props.user.cartDetail, paymentData: data
    }
    Axios.post('/api/users/successBuy', variables)
    .then(response => {
      if (response.data.success) {
       
      }else{
        alert('Failed to process your payment')
      }
    
    })
  }

  const transactionError = () => {
    console.log("err");

  }

  const transactionCanceled = () => {
    console.log("canceled");

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
              {props.cart.length ? (
                <div className="contenedor-ppCheck">
                  <h2>Products:</h2>
                  <h2>Price:</h2>
                </div>
              ) : (
                ""
              )}
              {props.cart.length ? (
                props.cart.map((elemento) => {
                  return (
                    <div className="contenedor-returnCheck d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <h6
                          id="button"
                          onClick={() =>
                            props.addToCart(props.cart, false, elemento)
                          }
                        >
                          x
                        </h6>
                        <img src={elemento.image} />
                        <h3 className="ps-4">{elemento.name} ({elemento.quantity}) </h3>
                      </div>
                      <h4>{elemento.price} $</h4>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="contenedor-noItems text-center">
                    <h2>No Items in cart</h2>
                  </div>
                  <Link className="link-backShop" to="/shop">
                    Back to Shop
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fondo-contenedorCheck final">
          <div className="contenedor-check">
            <div className="item-check">
              <h1>Confirm Your Purchase</h1>
              <div className="contenedor-compra">
             
                <h2>Total: {props.cart.length && props.cart.reduce((total, item) => total + (item.price*item.quantity), 0)} $</h2>
              </div>
              
              <Paypal
                 toPay={props.cart.length && props.cart.reduce((total, item) => total + (item.price*item.quantity), 0)}
                onSuccess={transactionSuccess}
                transactionsError={transactionError}
                transactionsCanceled={transactionCanceled}
               


              />
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
