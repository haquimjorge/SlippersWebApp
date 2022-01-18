import React from "react";
import Menu from "../components/Menu";
import Input from "../components/Input";
import MainHome from "../components/MainHome";
import PromoHome from "../components/PromoHome";
import Footer from "../components/Footer";
import CarouselMarcas from "../components/CarouselMarcas";
import CarritoModal from "../components/CarritoModal";
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="portada">
        <Menu />
        <Container fluid className="h-100 d-flex justify-content-center align-items-center">
            <div className="home-action-call p-3 rounded d-flex flex-column justify-content-center align-items-center">

            <h3 className="display-6 text-white">Check our new shoes!</h3>
            <Link className="sign-button text-center" to="/shop">Go to shop</Link>
            </div>

        </Container>
      </div>
      {/* <CarritoModal/> */}
      {/* <Input /> */}
      <MainHome />
      <PromoHome />
      <CarouselMarcas />
      <Footer />
      
    </>
  );
};

export default Home;
