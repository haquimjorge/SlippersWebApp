import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Facebook from "../assets/facebook.png"
import Instagram from "../assets/instagram.png"
import Mail from "../assets/mail.png"
import Twitter from "../assets/twi.png"
import Logo from "../assets/logo3.png"

function Footer() {
  return (
    <div>
      <Navbar className="container-menu-footer" expand="lg">
        <Container>
          <Nav className="m-auto">
            <Link className="p-2 botones-menu text-light text-center" to="/">
              Home
            </Link>
            <Link
              className="p-2 botones-menu text-light text-center"
              to="/shop"
            >
              Shop
            </Link>
            <Link
              className="p-2 botones-menu text-light text-center"
              to="/contacts"
            >
              Contacts
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="contenedor-redes">
        <div className="iconos-redes">
          <div className="iconoItem-redes">
            <img src={Facebook} alt="facebook logo" />
          </div>
          <div className="iconoItem-redes">
            <img src={Instagram} alt="instagram logo" />
          </div>
          <div className="logo-footer">
            <img src={Logo} alt="slippers logo" />
          </div>
          <div className="iconoItem-redes">
            <img src={Twitter} alt="twitter logo" />
          </div>
          <a href="mailto:Slippers@outlook.com" className="iconoItem-redes">
            <img src={Mail} alt="outlook logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
