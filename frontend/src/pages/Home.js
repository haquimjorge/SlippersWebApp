import React from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import MainHome from "../components/MainHome";
import PromoHome from "../components/PromoHome";
import Footer from "../components/Footer";
import CarouselMarcas from "../components/CarouselMarcas";

const Home = () => {
  return (
    <>
      <div className="portada">
        <Menu />
      </div>
      <Input />
      <MainHome />
      <PromoHome />
      <CarouselMarcas />
      <Footer />
    </>
  );
};

export default Home;
