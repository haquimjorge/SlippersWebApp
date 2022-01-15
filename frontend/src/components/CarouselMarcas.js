import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class AutoPlay extends Component {
  render() {
    const marcasSociales = [
      {
        imagen:
          "https://th.bing.com/th/id/OIP.G5WRGInqHtXXper25bj11wHaEU?pid=ImgDet&w=600&h=350&rs=1",
      },
      {
        imagen:
          "https://clipground.com/images/giuseppe-zanotti-logo-clipart-9.png",
      },
      {
        imagen:
          "https://logos-download.com/wp-content/uploads/2019/11/Stuart_Weitzman_Logo_horizontally-700x55.png",
      },
      {
        imagen:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/John_Lobb_SAS_Logo.svg/800px-John_Lobb_SAS_Logo.svg.png",
      },
      {
        imagen:
          "https://cdn.bewinkel.com/pictures/32/compressed/20170203152110Santoni_logo_(1).svg.png",
      },
      {
        imagen:
          "https://s3.amazonaws.com/owler-image/logo/edward-jones_owler_20160223_115102_original.png",
      },
      {
        imagen:
          "https://therake.com/assets/logos/therake.png?113cc8713b453352f9bdb021b868407bd9df06f7",
      },
    ];

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 1500,
      cssEase: "linear",
    };
    return (
      <div>
        <div className="contenedor-marcasSociales">
          <Slider {...settings}>
            {marcasSociales.map((elemento) => (
              <div>
                <img
                  className="d-block w-100"
                  src={elemento.imagen}
                  alt="First slide"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="pedidos-exclusivos">
          <p>
            You can place your exclusive and personalized order, your favorite
            brand with our company.
            <br></br>
            Tell our attendants what your style is and we'll send you the best
            options!
          </p>
        </div>
      </div>
    );
  }
}
