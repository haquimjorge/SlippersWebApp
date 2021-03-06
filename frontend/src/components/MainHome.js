import Carousel from "../components/Carousel";

function MainHome() {
  return (
    <>
      <main>
        <div className="div-titulo">
          <p>Get to know all the models and styles that are in</p>
          <h1 className="titulo">Slippers</h1>
          <p>
            You can find our exclusive models in our store or place a
            personalized order!
          </p>
        </div>
        <div className="contenedor-carouselZapatos">
          <Carousel />
        </div>
      </main>
    </>
  );
}

export default MainHome;
