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


const VerifyDinamic = withRouter(Verify)

function App(props) {
    const { authUser } = props;
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      authUser();
    }
  }, [authUser, token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/admin" element={<AdminDashboard />} exact />
        {/* <Route path="/admin/category" element={<CategoryCreate/>} exact /> */}
        <Route path="/admin/category/:slug" element={<CategoryUpdate/>} exact />
        {!token 
        ? <>
        <Route path="/signin" element={<SignIn />} exact /> 
        <Route path="/signup" element={<SignUp />} exact />
        
        </>
        : <Route path="/account" element={<Account />}/>}    
        <Route path="/shop" element={<Shop />} exact />  
        <Route path="/contacts" element={<Contacts />} exact />
        <Route path="/verify/:uniqueString" element={<VerifyDinamic />}/>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
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
