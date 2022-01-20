/* eslint-disable jsx-a11y/alt-text */
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux";
import Paypal from '../components/Paypal';
import Axios from "axios";
import Logo from "../assets/logo3.png"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";

function CheckoutModal(props) {
    const toastrOption = {
        timeOut: 8000
    }
    function handleModalClose(){
        props.onHide()
        toastr.success("Order Reserved!", "Email sent to " + props.email,toastrOption )
        props.empty()
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure that you want to order these products?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex flex-column">
            {props.cart?.map(product =>
            <div className="d-flex  p-3 mb-3 admin-variaton-shoe-container">
            
            <div className="col-6 d-flex justify-content-center align-items-center flex-column">
            <h5 className="fw-bold">{product.name}</h5>
            <div className="admin-modal-image" style={{ backgroundImage: `url(${product.image})` }} ></div>
            
        
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center flex-column">
            <p><strong>Quantity:</strong> {product.quantity }</p>
            <p><strong>Price:</strong> {product.price * product.quantity}</p> 
            </div>
            </div> )}
            <p className="display-6 text-center">Total Amount: <strong>$ {props.cart.length && props.cart.reduce((total, item) => total + (item.price*item.quantity), 0)}</strong></p>
            <p>Please check the following information before reserving:</p>
            <div className="checkout-information-modal">

            <h2>New orleans</h2>
          <h3>Garden districts - United States</h3>
          <h4>Opening hours:</h4>
          <h4>From 12:00 a.m. to 20:30 p.m.</h4>
          <h5>From monday to sunday</h5>
          <p>Phone - (54 11) 4831 7264</p>
            </div>


            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="sign-button w-100" onClick={()=>handleModalClose()}>Reserve Now</Button>
        </Modal.Footer>
      </Modal>
    );
  }



const Checkout = (props) => {
    const [modalShow, setModalShow] = useState(false);
    console.log(props.cart)

    function handleModal(){
        if(props.cart.length>0){
            setModalShow(true)

        }else{
            toastr.error("No items in cart", "Please head to Shop and add a product")
        }
    }
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
      <CheckoutModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        cart={props.cart}
        email={props.user?.email}
        empty={()=> props.emptyCart()}
      />

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
              <div className="mt-3">

              <p className="m-0 p-0">Or you can choose to pick up on store</p>
              <button className="checkout-pickup-button" onClick={()=>handleModal()}  ><img className="checkout-logoin-button" src={Logo}></img>Store Pickup</button>
              </div>
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
  emptyCart: userActions.emptyCart
};

const mapStateToProps = (state) => {
  return {
      user: state.userReducer.user,
    cart: state.userReducer.cart,
    shoes: state.shoeReducer.shoes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
