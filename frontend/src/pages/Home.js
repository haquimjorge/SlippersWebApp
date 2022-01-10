import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import MainHome from "../components/MainHome";
import Dire from "../components/Dire";
import Footer from "../components/Footer";



const Home = () => {
  return (
    <>
      <Navbar />
      <Input />
      <MainHome />
      
      <Dire />
      <Footer />
    </>
  );
};

export default Home;
