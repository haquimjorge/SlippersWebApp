import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Carrito from "./Carrito";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import Image from "react-bootstrap/Image";

function Menu(props) {
  let imagenUsuario = (
    <Image
      className="usuario"
      src={props.user ? props.user.image : "./assets/usuario1.png"}
    ></Image>
  );
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
              <Link className="botones-menu text-light text-center" to="/">
                Home
              </Link>
              <Link className="botones-menu text-light text-center" to="/shop">
                Shop
              </Link>
              <Link
                className="botones-menu text-light text-center"
                to="/contacts"
              >
                Contacts
              </Link>
            </Nav>
            <DropdownButton id="dropdown-basic-button" title={imagenUsuario}>
              {props.user ? (
                <>
                  <Dropdown.Item as={Link} to="/account">
                    Account
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => props.logOut()}>
                    Sign Out
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/signin">
                    Sign In
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/signup">
                    Sign Up
                  </Dropdown.Item>
                </>
              )}
            </DropdownButton>
            <Link to="/cart" className="d-flex justify-content-center">
              <Carrito />
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  logOut: userActions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
