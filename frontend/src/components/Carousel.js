import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper.min.css";
import "../../node_modules/swiper/modules/effect-coverflow/effect-coverflow.min.css";
import "../../node_modules/swiper/modules/navigation/navigation.min.css";
import "../../node_modules/swiper/modules/pagination/pagination.min.css";
import "../styles.css";
import { connect } from 'react-redux';
import shoeActions from "../redux/actions/shoeActions";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation
} from "swiper/core";
import Logo from "../assets/logo2.png"
// import Img1 from "../assets/img1.jpg";
// import Img2 from "../assets/img2.jpg";
// import Img3 from "../assets/img3.jpg";
// import Img4 from "../assets/img4.jpg";
// import Img5 from "../assets/img5.jpg";
// import Img6 from "../assets/img6.jpg";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function Carousel(props) {

  const { arrayShoes } = props

  useEffect(() => {
    props.arrayShoes();
  }, [arrayShoes]);


  return (
    <div className="container">
      <div className="title_wrapper">
        <div className="title_">
          <span>New</span>Models
        </div>
      </div>
      <Swiper
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        pagination={{
          clickable: true
        }}
        className="mySwiper"
      >
        {console.log(props.allShoes)}
        {props.allShoes ? (props.allShoes.map((elem) => {
          return (
            <>
              <SwiperSlide>
                <img src={elem.image} />
              </SwiperSlide>
            </>
          )
        }))
          :
          <SwiperSlide>
            <img src={Logo} />
          </SwiperSlide>
        }
      </Swiper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allShoes: state.shoeReducer.shoes
  }
}

const mapDispatchToProps = {
  arrayShoes: shoeActions.getShoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

