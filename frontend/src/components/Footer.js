import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <div>
      <Navbar className="container-menu-footer" expand="lg">
        <Container>
          <Nav className="m-auto">
            <Nav.Link
              className="botones-menu text-light text-center"
              href="#home"
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="botones-menu text-light text-center"
              href="#link"
            >
              Shop
            </Nav.Link>
            <Nav.Link
              className="botones-menu text-light text-center"
              href="#link"
            >
              Contacts
            </Nav.Link>
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
    </div>
  );
}

export default Footer;
