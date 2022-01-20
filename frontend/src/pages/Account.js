import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { connect } from "react-redux";

const Account = (props) => {
    console.log(props.cart)
    console.log(props)
    let fullName = `${props.user?.name} ${props.user?.lastName}`
  return (
    <>
    <Menu />
      <div className="account-profile-container">
        <div className="account-info-container">
          <h4>Account Details</h4>
          <div className="first-info-container">
            <div className="user-first-info">
              <input
              className="input-profile"
              disabled
              placeholder={fullName}
              />
              <input
              className="input-profile"
              disabled
              placeholder={props.user?.email}
              />
            </div>
            <div className="profile-pic" style={{ backgroundImage: `url(${props.user?.image})` }}
>
                
            </div>
          </div>
          <div className="second-info-container">
            <div className="more-user-info">
          <input
              className="input-profile"
              disabled
              placeholder={   props.user?.gender? `Gender: ${props.user.gender}` : "Pending..."}
              />
              <input
              className="input-profile"
              disabled
              placeholder={`Role:${props.user?.rol}`}
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
      shoes: state.shoeReducer.shoes,
      user:state.userReducer.user
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Account);
