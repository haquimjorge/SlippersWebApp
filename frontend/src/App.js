import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Contacts from "./pages/Contacts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import userActions from "./redux/actions/userActions";
import Account from "./pages/Account"
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNav from "./components/AdminNav"
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import Verify from './pages/Verify'
import withRouter from "./utilities/withRouter";
import SubCategoryUpdate from "./pages/admin/subcategory/SubCategoryUpdate";
import ShoeProduct from "./pages/ShoeProduct";
import ReduxToastr from 'react-redux-toastr'
// import PayPalCheckOutButton from "./components/PaypalCheckOutButton";


const VerifyDinamic = withRouter(Verify)
const ShoeProductDinamic = withRouter(ShoeProduct)

function App(props) {
    const { authUser } = props;
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      authUser();
    }
  }, [authUser, token]);
  return (
      <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        {props.user && props.user.rol === "Admin" && <Route path="/admin" element={<AdminDashboard />}/>}
        {!token 
        ? <>
        <Route path="/signin" element={<SignIn />} exact /> 
        <Route path="/signup" element={<SignUp />} exact />
        
        </>
        : <Route path="/account" element={<Account />}/>}    
        <Route path="/shop" element={<Shop />} exact />  
        <Route path="/shoe/:shoesId" element={<ShoeProductDinamic/>} exact />
        <Route path="/contacts" element={<Contacts />} exact />
        <Route path="/verify/:uniqueString" element={<VerifyDinamic />}/>
        <Route path="*" element={<Home />} />
        <Route path="shoeproduct" element={<ShoeProduct />} />
      </Routes>
    </BrowserRouter>
    <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    preventDuplicates
    position="bottom-center"
    getState={(state) => state.toastr} // This is the default
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    progressBar
    closeOnToastrClick/>
    </>
  );
}

const mapStateToProps = (state) =>{
    return{
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
  authUser: userActions.authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


