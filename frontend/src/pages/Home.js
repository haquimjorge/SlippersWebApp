import React from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import MainHome from "../components/MainHome";
import PromoHome from "../components/PromoHome";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="portada">
        <Menu />
      </div>
      <Input />
      <MainHome />
      <PromoHome />
      <Footer />
    </>
  );
};

export default Home;
