import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
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
            <img src="./assets/facebook.png" />
          </div>
          <div className="iconoItem-redes">
            <img src="./assets/instagram.png" />
          </div>
          <div className="logo-footer">
            <img src="./assets/logo3.png" />
          </div>
          <div className="iconoItem-redes">
            <img src="./assets/twi.png" />
          </div>
          <a href="mailto:Slippers@outlook.com" className="iconoItem-redes">
            <img src="./assets/mail.png" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
