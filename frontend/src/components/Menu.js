import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Carrito from "./Carrito";
import Usuario from "./Usuario";

function Menu() {
  return (
    <>
      <Navbar className="contenedor-menu bg-dark" expand="lg">
        <Container>
          <div className="logo-menu ms-5">
            <img src="./assets/logo3.png" />
          </div>
          <Navbar.Toggle
            className="hamburguesa"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
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
            <Nav.Link className="d-flex justify-content-center">
              <Usuario />
            </Nav.Link>
            <Nav.Link className="d-flex justify-content-center">
              <Carrito />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
