import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { connect } from "react-redux";

const Account = (props) => {
    console.log(props.cart)
  return (
    <>
      <div className="menu-contacts">
        <Menu />
        <p>mi cuenta</p>
      </div>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {

  };
  const mapStateToProps = (state) => {
    return {
      cart: state.userReducer.cart,
      shoes: state.shoeReducer.shoes
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Account);
