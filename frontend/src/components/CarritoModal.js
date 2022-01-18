import React from "react";
import { useState, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader'
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle'
import OffcanvasBody from 'react-bootstrap/OffcanvasBody'
import { Button } from 'react-bootstrap'
import Cart from "../assets/carrito-de-compras.png"
import shoeActions from "../redux/actions/shoeActions";
import { toastr } from "react-redux-toastr";

const CarritoModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    useEffect(() => {
        console.log(props.cart)
    }, [props.cart])


    function addToCart(shoe){
        toastr.error("Item Deleted from Cart!", shoe.name)
        props.addToCart(props.cart, false, shoe)
    }



    return (
        <>
            <Button onClick={toggleShow} className="cart-button">
                <div className="carrito">
                    <img src={Cart} alt="cart" />
                </div>
            </Button>
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {(props.cart && props.cart.length > 0) ?
                        <table>
                            <tr>
                                <th className="header-cart">Product</th>
                                <th className="header-cart">Price</th>

                            </tr>
                            {props.cart.map(shoe => {
                                return (
                                    <tr className="cart-row">
                                        <td className="product-cart">
                                            <img src={shoe.image} className="image-cart" alt="cart" /><p className="product-name">{shoe.name}</p>
                                            <p className="product-quantity">({shoe.quantity})</p>
                                        </td>
                                        <td className="product-price">
                                            ${shoe.price*shoe.quantity}
                                        </td>
                                        <td><button className="delete-button" onClick={() =>addToCart(shoe) }>X</button></td>
                                    </tr>
                                )
                            })}
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>${
                                        props.cart.reduce((total, item) => total + (item.price*item.quantity), 0)
                                        //data.reduce((total, item)=>total+(item.aprice*item.quantity),0)
                                    }
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        : <h2>There are no products added to the cart</h2>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

const mapDispatchToProps = {
    addToCart: userActions.addToCart
};

const mapStateToProps = (state) => {
    return {
        cart: state.userReducer.cart
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarritoModal);