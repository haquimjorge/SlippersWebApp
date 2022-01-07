function Footer() {
  return (
    <>
      <div className="container-menu-footer">
        <ul className="menu">
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
      </div>
      <div className="contenedor-redes">
        <div className="iconos-redes">
          <a href="#" className="iconoItem-redes">
            <img src="./assets/facebook.png" />
          </a>
          <a href="#" className="iconoItem-redes">
            <img src="./assets/instagram.png" />
          </a>
          <a href="#" className="logo-footer">
            <img src="./assets/logo3.png" />
          </a>
          <a href="#" className="iconoItem-redes">
            <img src="./assets/twi.png" />
          </a>
          <a href="mailto:Slippers@outlook.com" className="iconoItem-redes">
            <img src="./assets/mail.png" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
