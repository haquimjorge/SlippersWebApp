import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import MainHome from "../components/MainHome";
import Dire from "../components/Dire";
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
      <Dire />
      <Footer />
    </>
  );
};

export default Home;
