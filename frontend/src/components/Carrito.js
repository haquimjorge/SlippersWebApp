import Cart from "../assets/carrito-de-compras.png";
import Paypal from './Paypal';
function Carrito() {
  return (
    <>
      <div className="carrito">
        <img src={Cart} alt="cart" />
      </div>
      <Paypal/>
    </>
  );
}

export default Carrito;
