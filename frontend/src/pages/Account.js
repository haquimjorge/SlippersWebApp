import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { connect } from "react-redux";

const Account = (props) => {
    console.log(props.cart)
    console.log(props)
  return (
    <>
    <Menu />
      <div className="account-profile-container">
        <div className="account-info-container">
          <div className="first-info-container">
            <div className="user-first-info">
              <input
              className="input-profile"
              disabled
              placeholder="Name"
              />
              <input
              className="input-profile"
              disabled
              placeholder="Email"
              />
            </div>
            <div className="profile-pic" style={{backgroundImage: "adasdsadd"}}>
                <p> poner fondo imagen del usuariio y sacar borde yellow</p>
            </div>
          </div>
          <div className="second-info-container">
            <div className="more-user-info">
          <input
              className="input-profile"
              disabled
              placeholder="Gender"
              />
              <input
              className="input-profile"
              disabled
              placeholder="Role: 'Guest'"
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

  };
  const mapStateToProps = (state) => {
    return {
      cart: state.userReducer.cart,
      shoes: state.shoeReducer.shoes
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Account);
