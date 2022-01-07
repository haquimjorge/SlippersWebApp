function Navbar() {
  return (
    <>
      <div className="portada">
        <div className="container-menu">
          <ul className="menu">
            <div className="logo-menu">
              <img src="./assets/logo3.png" />
            </div>
            <li>
              <a className="botones-menu" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="botones-menu" href="#">
                Shopp
              </a>
            </li>
            <li>
              <a className="botones-menu" href="#">
                Contacts
              </a>
            </li>
          </ul>
          <a type="button" href="#">
            <img
              className="carrito"
              src="./assets/carrito-de-compras.png"
              alt="carrito"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
