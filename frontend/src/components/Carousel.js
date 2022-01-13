import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper.min.css";
import "../../node_modules/swiper/modules/effect-coverflow/effect-coverflow.min.css";
import "../../node_modules/swiper/modules/navigation/navigation.min.css";
import "../../node_modules/swiper/modules/pagination/pagination.min.css";
import "../styles.css";
import './css/carouselstyle.css'
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
import Logo from "../assets/logo2.png";


SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function Carousel(props) {
  const { arrayShoes } = props;

  useEffect(() => {
    props.arrayShoes();
  }, [arrayShoes]);

  return (
    <div className="container-carousel">
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
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {console.log(props.allShoes)}
        <div className="shoes-container-card">
          {props.allShoes ? (props.allShoes.map((elem) => {
            return (
              <SwiperSlide>
                <div class="containerr">
                  <div class="card">
                    <div class="imgBx">
                      <img src={elem.image} />
                    </div>
                    <div class="contentBx">
                      <h2 className="name-shoe">{elem.name}</h2>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          }))
            :
            <SwiperSlide>
              <img src={Logo} />
            </SwiperSlide>
          }
        </div>
      </Swiper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allShoes: state.shoeReducer.shoes,
  };
};

const mapDispatchToProps = {
  arrayShoes: shoeActions.getShoes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);


{/* <SwiperSlide>
  <div className="card-shoe">
    <div className="img-div">
      <img src={elem.image} />
      <p className="name-shoe">{elem.name}</p>
    </div>
  </div>
</SwiperSlide> */}