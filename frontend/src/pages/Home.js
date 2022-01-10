import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import MainHome from "../components/MainHome";
import PromoHome from "../components/PromoHome";
import Footer from "../components/Footer";
import SignIn from "../components/SignIn";

const Home = () => {
  return (
    <>
      <div className="portada">
        <Navbar />
      </div>
      <Input />
      <MainHome />
      <PromoHome />
      <Footer />
    </>
  );
};

export default Home;
